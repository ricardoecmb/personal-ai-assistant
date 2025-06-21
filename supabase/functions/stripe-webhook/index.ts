import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    
    // Verify webhook signature
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    // In a real implementation, you would verify the webhook signature here
    // For now, we'll parse the event directly
    const event = JSON.parse(body)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const userId = session.metadata.user_id

        // Update user to premium plan
        const { error } = await supabaseClient
          .from('profiles')
          .update({
            plan: 'premium',
            plan_expires_at: null, // Premium doesn't expire
            stripe_customer_id: session.customer,
          })
          .eq('id', userId)

        if (error) {
          console.error('Error updating user plan:', error)
          throw error
        }

        // Log activity
        await supabaseClient
          .from('activity_log')
          .insert({
            user_id: userId,
            action: 'plan_upgraded',
            description: 'Plano atualizado para Premium',
          })

        break

      case 'customer.subscription.deleted':
        const subscription = event.data.object
        const customerId = subscription.customer

        // Downgrade user to free plan
        const { error: downgradeError } = await supabaseClient
          .from('profiles')
          .update({
            plan: 'free',
            plan_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        if (downgradeError) {
          console.error('Error downgrading user plan:', downgradeError)
          throw downgradeError
        }

        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})