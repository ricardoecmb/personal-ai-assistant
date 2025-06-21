import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

export interface Integration {
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
}

export const useIntegrations = () => {
  const { user } = useAuth()
  const [integrations, setIntegrations] = useState<Integration | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchIntegrations()
    }
  }, [user])

  const fetchIntegrations = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      setIntegrations(data)
    } catch (error) {
      console.error('Error fetching integrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleIntegration = async (integration: keyof Pick<Integration, 'gmail_enabled' | 'calendar_enabled' | 'notion_enabled' | 'slack_enabled'>) => {
    if (!user || !integrations) return

    try {
      const newValue = !integrations[integration]
      
      const { error } = await supabase
        .from('integrations')
        .update({ [integration]: newValue })
        .eq('user_id', user.id)

      if (error) throw error

      setIntegrations(prev => prev ? { ...prev, [integration]: newValue } : null)
      
      const integrationName = integration.replace('_enabled', '')
      toast.success(`${integrationName} ${newValue ? 'ativado' : 'desativado'} com sucesso!`)
      
      return { success: true }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar integração')
      return { success: false, error: error.message }
    }
  }

  const connectIntegration = async (integration: string, token: string) => {
    if (!user) return

    try {
      const tokenField = `${integration}_token` as keyof Integration
      const enabledField = `${integration}_enabled` as keyof Integration

      const { error } = await supabase
        .from('integrations')
        .update({ 
          [tokenField]: token,
          [enabledField]: true 
        })
        .eq('user_id', user.id)

      if (error) throw error

      await fetchIntegrations()
      toast.success(`${integration} conectado com sucesso!`)
      return { success: true }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao conectar integração')
      return { success: false, error: error.message }
    }
  }

  return {
    integrations,
    loading,
    toggleIntegration,
    connectIntegration,
    refetch: fetchIntegrations,
  }
}