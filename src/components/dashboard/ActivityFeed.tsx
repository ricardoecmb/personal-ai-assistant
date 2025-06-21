import React from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Mail, Calendar, FileText, MessageSquare } from 'lucide-react'
import { ActivityLog } from '../../hooks/useUsageStats'

interface ActivityFeedProps {
  activities: ActivityLog[]
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getIcon = (action: string) => {
    switch (action) {
      case 'email_sent':
        return <Mail className="h-4 w-4 text-blue-600" />
      case 'event_created':
        return <Calendar className="h-4 w-4 text-green-600" />
      case 'task_added':
        return <FileText className="h-4 w-4 text-purple-600" />
      case 'message_sent':
        return <MessageSquare className="h-4 w-4 text-orange-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getBgColor = (action: string) => {
    switch (action) {
      case 'email_sent':
        return 'bg-blue-100'
      case 'event_created':
        return 'bg-green-100'
      case 'task_added':
        return 'bg-purple-100'
      case 'message_sent':
        return 'bg-orange-100'
      default:
        return 'bg-gray-100'
    }
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Nenhuma atividade recente</p>
        <p className="text-sm">Comece usando seu assistente para ver atividades aqui</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start space-x-3"
        >
          <div className={`w-8 h-8 ${getBgColor(activity.action)} rounded-full flex items-center justify-center flex-shrink-0`}>
            {getIcon(activity.action)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {activity.description}
            </p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(activity.created_at), {
                addSuffix: true,
                locale: ptBR
              })}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ActivityFeed