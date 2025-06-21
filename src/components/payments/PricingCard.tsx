import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Zap } from 'lucide-react'
import { createCheckoutSession } from '../../lib/stripe'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'
import toast from 'react-hot-toast'

interface PricingCardProps {
  name: string
  description: string
  price: { monthly: number; annual: number }
  priceId: { monthly: string; annual: string }
  features: string[]
  isPopular?: boolean
  isCurrentPlan?: boolean
  isAnnual: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  price,
  priceId,
  features,
  isPopular = false,
  isCurrentPlan = false,
  isAnnual
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Faça login para continuar')
      return
    }

    setLoading(true)
    try {
      const currentPriceId = isAnnual ? priceId.annual : priceId.monthly
      const { url } = await createCheckoutSession(currentPriceId, user.id)
      window.location.href = url
    } catch (error) {
      toast.error('Erro ao processar pagamento')
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentPrice = isAnnual ? price.annual : price.monthly
  const isFree = currentPrice === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
        isPopular 
          ? 'border-primary-200 ring-4 ring-primary-100 transform scale-105' 
          : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Crown className="h-4 w-4" />
            <span>Mais Popular</span>
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
          {isFree ? <Zap className="h-8 w-8" /> : <Crown className="h-8 w-8" />}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            R$ {currentPrice.toFixed(2).replace('.', ',')}
          </span>
          {!isFree && (
            <span className="text-gray-600">
              /{isAnnual ? 'ano' : 'mês'}
            </span>
          )}
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading || isCurrentPlan}
          className={`w-full inline-flex justify-center items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isCurrentPlan
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : isPopular
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {loading ? (
            <LoadingSpinner size="sm" className="text-current" />
          ) : isCurrentPlan ? (
            'Plano Atual'
          ) : isFree ? (
            'Começar Grátis'
          ) : (
            'Assinar Agora'
          )}
        </button>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-sm text-gray-900">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default PricingCard