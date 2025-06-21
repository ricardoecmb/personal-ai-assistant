import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          plan: 'free' | 'premium'
          plan_expires_at: string | null
          created_at: string
          updated_at: string
          stripe_customer_id: string | null
          whatsapp_number: string | null
          whatsapp_verified: boolean
        }
        Insert: {
          id: string
          email: string
          full_name: string
          plan?: 'free' | 'premium'
          plan_expires_at?: string | null
          stripe_customer_id?: string | null
          whatsapp_number?: string | null
          whatsapp_verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          plan?: 'free' | 'premium'
          plan_expires_at?: string | null
          stripe_customer_id?: string | null
          whatsapp_number?: string | null
          whatsapp_verified?: boolean
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          gmail_enabled: boolean
          calendar_enabled: boolean
          notion_enabled: boolean
          slack_enabled: boolean
          gmail_token: string | null
          calendar_token: string | null
          notion_token: string | null
          slack_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          gmail_enabled?: boolean
          calendar_enabled?: boolean
          notion_enabled?: boolean
          slack_enabled?: boolean
          gmail_token?: string | null
          calendar_token?: string | null
          notion_token?: string | null
          slack_token?: string | null
        }
        Update: {
          gmail_enabled?: boolean
          calendar_enabled?: boolean
          notion_enabled?: boolean
          slack_enabled?: boolean
          gmail_token?: string | null
          calendar_token?: string | null
          notion_token?: string | null
          slack_token?: string | null
          updated_at?: string
        }
      }
      usage_stats: {
        Row: {
          id: string
          user_id: string
          commands_used: number
          emails_processed: number
          events_created: number
          tasks_managed: number
          month: string
          created_at: string
        }
        Insert: {
          user_id: string
          commands_used?: number
          emails_processed?: number
          events_created?: number
          tasks_managed?: number
          month: string
        }
        Update: {
          commands_used?: number
          emails_processed?: number
          events_created?: number
          tasks_managed?: number
        }
      }
      activity_log: {
        Row: {
          id: string
          user_id: string
          action: string
          description: string
          created_at: string
        }
        Insert: {
          user_id: string
          action: string
          description: string
        }
        Update: never
      }
    }
  }
}