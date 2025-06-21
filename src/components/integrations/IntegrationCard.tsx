import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Settings, ExternalLink } from 'lucide-react'
import { useIntegrations } from '../../hooks/useIntegrations'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'

interface IntegrationCardProps {
  name: string
  key: 'gmail' | 'calendar' | 'notion' | 'slack'
  icon: React.ReactNode
  description: string
  color: string
  bgColor: string
  enabled: boolean
  connected: boolean
  isPremium?: boolean
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  key: integrationKey,
  icon,
  description,
  color,
  bgColor,
  enabled,
  connected,
  isPremium = false
}) => {
  const { profile } = useAuth()
  const { toggleIntegration } = useIntegrations()
  const [loading, setLoading] = useState(false)

  const isFreePlan = profile?.plan === 'free'
  const canToggle = !isPremium || !isFreePlan

  const handleToggle = async () => {
    if (!canToggle || loading) return

    setLoading(true)
    await toggleIntegration(`${integrationKey}_enabled` as any)
    setLoading(false)
  }

  const handleConnect = () => {
    // Redirect to OAuth flow or show connection modal
    const authUrls = {
      gmail: 'https://accounts.google.com/oauth/authorize?...',
      calendar: 'https://accounts.google.com/oauth/authorize?...',
      notion: 'https://api.notion.com/v1/oauth/authorize?...',
      slack: 'https://slack.com/oauth/v2/authorize?...'
    }

    if (authUrls[integrationKey]) {
      window.open(authUrls[integrationKey], '_blank', 'width=500,height=600')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <button
            onClick={handleToggle}
            disabled={!canToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled ? 'bg-primary-600' : 'bg-gray-200'
            } ${!canToggle ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {connected ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Conectado</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Não conectado</span>
            </>
          )}
        </div>

        {!connected && enabled && (
          <button
            onClick={handleConnect}
            className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
          >
            <Settings className="h-4 w-4" />
            <span>Conectar</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        )}
      </div>

      {isPremium && isFreePlan && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
          Disponível apenas no plano Premium
        </div>
      )}
    </motion.div>
  )
}

export default IntegrationCard