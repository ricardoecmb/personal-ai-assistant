import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface UsageStats {
  commands_used: number
  emails_processed: number
  events_created: number
  tasks_managed: number
  month: string
}

export interface ActivityLog {
  id: string
  action: string
  description: string
  created_at: string
}

export const useUsageStats = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<UsageStats | null>(null)
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchStats()
      fetchActivities()
    }
  }, [user])

  const fetchStats = async () => {
    if (!user) return

    try {
      const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
      
      const { data, error } = await supabase
        .from('usage_stats')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', currentMonth)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      setStats(data || {
        commands_used: 0,
        emails_processed: 0,
        events_created: 0,
        tasks_managed: 0,
        month: currentMonth
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchActivities = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setActivities(data || [])
    } catch (error) {
      console.error('Error fetching activities:', error)
    }
  }

  const logActivity = async (action: string, description: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('activity_log')
        .insert({
          user_id: user.id,
          action,
          description,
        })

      if (error) throw error
      await fetchActivities()
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  }

  return {
    stats,
    activities,
    loading,
    logActivity,
    refetch: () => {
      fetchStats()
      fetchActivities()
    },
  }
}