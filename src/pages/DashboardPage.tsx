import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  User, 
  Settings, 
  LogOut, 
  MessageSquare, 
  Mail, 
  Calendar, 
  FileText,
  Crown,
  BarChart3,
  Zap,
  Link as LinkIcon,
  AlertTriangle,
  Smartphone,
  Copy,
  ExternalLink
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useIntegrations } from '../hooks/useIntegrations'
import { useUsageStats } from '../hooks/useUsageStats'
import StatsCard from '../components/dashboard/StatsCard'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import IntegrationCard from '../components/integrations/IntegrationCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const DashboardPage: React.FC = () => {
  const { user, profile, signOut, updateProfile, loading: authLoading } = useAuth()
  const { integrations, loading: integrationsLoading } = useIntegrations()
  const { stats, activities, loading: statsLoading } = useUsageStats()
  const [activeTab, setActiveTab] = useState('overview')

  if (authLoading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const isFreePlan = profile.plan === 'free'
  const planExpiresAt = profile.plan_expires_at ? new Date(profile.plan_expires_at) : null
  const daysLeft = planExpiresAt ? Math.ceil((planExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+5511999999999'
  const activationCode = `CHRONUS-${user.id.slice(0, 8).toUpperCase()}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado para a área de transferência!')
  }

  const integrationsList = [
    {
      name: 'Gmail',
      key: 'gmail' as const,
      icon: <Mail className="h-6 w-6" />,
      description: 'Gerencie seus emails através do WhatsApp',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      enabled: integrations?.gmail_enabled || false,
      connected: !!integrations?.gmail_token,
      isPremium: false
    },
    {
      name: 'Google Calendar',
      key: 'calendar' as const,
      icon: <Calendar className="h-6 w-6" />,
      description: 'Agende e consulte compromissos',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      enabled: integrations?.calendar_enabled || false,
      connected: !!integrations?.calendar_token,
      isPremium: false
    },
    {
      name: 'Notion',
      key: 'notion' as const,
      icon: <FileText className="h-6 w-6" />,
      description: 'Gerencie tarefas e projetos',
      color: 'text-gray-700',
      bgColor: 'bg-gray-50',
      enabled: integrations?.notion_enabled || false,
      connected: !!integrations?.notion_token,
      isPremium: true
    },
    {
      name: 'Slack',
      key: 'slack' as const,
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Integração com Slack',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      enabled: integrations?.slack_enabled || false,
      connected: !!integrations?.slack_token,
      isPremium: true
    }
  ]

  const statsData = [
    { 
      name: 'Comandos este mês', 
      value: isFreePlan ? `${stats?.commands_used || 0}/50` : (stats?.commands_used || 0).toString(), 
      icon: <Zap className="h-5 w-5" />,
      trend: { value: 12, isPositive: true }
    },
    { 
      name: 'Emails processados', 
      value: stats?.emails_processed || 0, 
      icon: <Mail className="h-5 w-5" />,
      trend: { value: 8, isPositive: true }
    },
    { 
      name: 'Eventos criados', 
      value: stats?.events_created || 0, 
      icon: <Calendar className="h-5 w-5" />,
      trend: { value: 15, isPositive: true }
    },
    { 
      name: 'Tarefas gerenciadas', 
      value: stats?.tasks_managed || 0, 
      icon: <FileText className="h-5 w-5" />,
      trend: { value: 5, isPositive: false }
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'integrations', name: 'Integrações', icon: <LinkIcon className="h-4 w-4" /> },
    { id: 'settings', name: 'Configurações', icon: <Settings className="h-4 w-4" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Chronus</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{profile.full_name}</span>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Status */}
        {isFreePlan && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Plano Gratuito</h3>
                <p className="text-primary-100">
                  {daysLeft > 0 ? `${daysLeft} dias restantes` : 'Período expirado'}
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Fazer Upgrade
              </button>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats */}
              {statsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsData.map((stat, index) => (
                    <StatsCard
                      key={index}
                      title={stat.name}
                      value={stat.value}
                      icon={stat.icon}
                      trend={stat.trend}
                    />
                  ))}
                </div>
              )}

              {/* Activity Feed */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                <ActivityFeed activities={activities} />
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              {/* WhatsApp Setup */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  <span>Configuração do WhatsApp</span>
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Smartphone className="h-6 w-6 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800 mb-3">Como conectar seu WhatsApp</h4>
                      <ol className="text-sm text-green-700 space-y-2 list-decimal list-inside">
                        <li>
                          Adicione o número{' '}
                          <span className="font-mono bg-green-100 px-2 py-1 rounded inline-flex items-center space-x-1">
                            <span>{whatsappNumber}</span>
                            <button
                              onClick={() => copyToClipboard(whatsappNumber)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </span>
                          {' '}aos seus contatos
                        </li>
                        <li>
                          Envie uma mensagem com o código:{' '}
                          <span className="font-mono bg-green-100 px-2 py-1 rounded inline-flex items-center space-x-1">
                            <span>{activationCode}</span>
                            <button
                              onClick={() => copyToClipboard(activationCode)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </span>
                        </li>
                        <li>Aguarde a confirmação de ativação</li>
                        <li>Comece a usar seu assistente!</li>
                      </ol>
                      <div className="mt-4 flex space-x-3">
                        <a
                          href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(activationCode)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Abrir WhatsApp</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrations */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suas Integrações</h3>
                {integrationsLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner size="md" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {integrationsList.map((integration) => (
                      <IntegrationCard
                        key={integration.key}
                        name={integration.name}
                        key={integration.key}
                        icon={integration.icon}
                        description={integration.description}
                        color={integration.color}
                        bgColor={integration.bgColor}
                        enabled={integration.enabled}
                        connected={integration.connected}
                        isPremium={integration.isPremium}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={profile.full_name}
                      onChange={(e) => updateProfile({ full_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Plan Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Plano</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-900">
                        {profile.plan === 'free' ? 'Gratuito' : 'Premium'}
                      </span>
                      {profile.plan === 'premium' && <Crown className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <p className="text-sm text-gray-500">
                      {profile.plan === 'free' 
                        ? `${daysLeft} dias restantes no período gratuito`
                        : 'Acesso completo a todas as funcionalidades'
                      }
                    </p>
                  </div>
                  {profile.plan === 'free' && (
                    <button
                      onClick={() => window.location.href = '/pricing'}
                      className="btn-primary"
                    >
                      Fazer Upgrade
                    </button>
                  )}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Zona de Perigo</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Excluir conta</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Excluir Conta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage