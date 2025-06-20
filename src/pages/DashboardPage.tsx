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
  CheckCircle,
  XCircle,
  BarChart3,
  Zap,
  Shield,
  CreditCard,
  Bell,
  Smartphone,
  Link as LinkIcon,
  AlertTriangle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const DashboardPage: React.FC = () => {
  const { user, logout, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) return null

  const isFreePlan = user.plan === 'free'
  const daysLeft = user.planExpiry ? Math.ceil((user.planExpiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0

  const integrations = [
    {
      name: 'Gmail',
      key: 'gmail' as keyof typeof user.integrations,
      icon: <Mail className="h-6 w-6" />,
      description: 'Gerencie seus emails através do WhatsApp',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Google Calendar',
      key: 'calendar' as keyof typeof user.integrations,
      icon: <Calendar className="h-6 w-6" />,
      description: 'Agende e consulte compromissos',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Notion',
      key: 'notion' as keyof typeof user.integrations,
      icon: <FileText className="h-6 w-6" />,
      description: 'Gerencie tarefas e projetos',
      color: 'text-gray-700',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'WhatsApp',
      key: 'whatsapp' as keyof typeof user.integrations,
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Seu assistente pessoal',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ]

  const stats = [
    { name: 'Comandos este mês', value: isFreePlan ? '23/50' : '247', icon: <Zap className="h-5 w-5" /> },
    { name: 'Emails processados', value: '156', icon: <Mail className="h-5 w-5" /> },
    { name: 'Eventos criados', value: '12', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Tarefas gerenciadas', value: '89', icon: <FileText className="h-5 w-5" /> }
  ]

  const toggleIntegration = (key: keyof typeof user.integrations) => {
    if (isFreePlan && key === 'notion') {
      alert('Notion está disponível apenas no plano Premium')
      return
    }
    
    updateUser({
      integrations: {
        ...user.integrations,
        [key]: !user.integrations[key]
      }
    })
  }

  const handleUpgrade = () => {
    updateUser({ plan: 'premium' })
    alert('Plano atualizado com sucesso!')
  }

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
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={logout}
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
                onClick={handleUpgrade}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className="text-primary-600">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email enviado para João Silva</p>
                      <p className="text-xs text-gray-500">Há 2 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reunião agendada para amanhã</p>
                      <p className="text-xs text-gray-500">Há 15 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tarefa adicionada ao Notion</p>
                      <p className="text-xs text-gray-500">Há 1 hora</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suas Integrações</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {integrations.map((integration) => (
                    <div key={integration.key} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${integration.bgColor} rounded-lg flex items-center justify-center ${integration.color}`}>
                            {integration.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{integration.name}</h4>
                            <p className="text-sm text-gray-500">{integration.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleIntegration(integration.key)}
                          disabled={isFreePlan && integration.key === 'notion'}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            user.integrations[integration.key] ? 'bg-primary-600' : 'bg-gray-200'
                          } ${isFreePlan && integration.key === 'notion' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              user.integrations[integration.key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      {user.integrations[integration.key] ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Conectado</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-400">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm">Desconectado</span>
                        </div>
                      )}
                      {isFreePlan && integration.key === 'notion' && (
                        <div className="mt-2 flex items-center space-x-2 text-amber-600">
                          <Crown className="h-4 w-4" />
                          <span className="text-sm">Premium</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Setup */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuração do WhatsApp</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Smartphone className="h-6 w-6 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Como conectar seu WhatsApp</h4>
                      <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                        <li>Adicione o número +55 11 99999-9999 aos seus contatos</li>
                        <li>Envie uma mensagem com o código: <code className="bg-green-100 px-1 rounded">CHRONUS-{user.id}</code></li>
                        <li>Aguarde a confirmação de ativação</li>
                        <li>Comece a usar seu assistente!</li>
                      </ol>
                    </div>
                  </div>
                </div>
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
                      value={user.name}
                      onChange={(e) => updateUser({ name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={user.email}
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
                        {user.plan === 'free' ? 'Gratuito' : 'Premium'}
                      </span>
                      {user.plan === 'premium' && <Crown className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <p className="text-sm text-gray-500">
                      {user.plan === 'free' 
                        ? `${daysLeft} dias restantes no período gratuito`
                        : 'Acesso completo a todas as funcionalidades'
                      }
                    </p>
                  </div>
                  {user.plan === 'free' && (
                    <button
                      onClick={handleUpgrade}
                      className="btn-primary"
                    >
                      Fazer Upgrade
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Confirmações de email</h4>
                      <p className="text-sm text-gray-500">Receba confirmação quando emails forem enviados</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Lembretes de agenda</h4>
                      <p className="text-sm text-gray-500">Receba lembretes de compromissos</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
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