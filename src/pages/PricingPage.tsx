import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Clock, 
  ArrowRight,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  Shield,
  Headphones
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCard from '../components/payments/PricingCard'
import { useAuth } from '../contexts/AuthContext'

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false)
  const { profile } = useAuth()

  const plans = [
    {
      name: 'Gratuito',
      description: 'Perfeito para começar',
      price: { monthly: 0, annual: 0 },
      priceId: { monthly: '', annual: '' },
      features: [
        'WhatsApp integrado',
        'Até 50 comandos/mês',
        'Gmail básico',
        'Calendário básico',
        'Suporte por email'
      ],
      isCurrentPlan: profile?.plan === 'free'
    },
    {
      name: 'Premium',
      description: 'Para máxima produtividade',
      price: { monthly: 29.90, annual: 299.90 },
      priceId: { 
        monthly: 'price_1234567890', // Replace with actual Stripe price IDs
        annual: 'price_0987654321' 
      },
      features: [
        'WhatsApp integrado',
        'Comandos ilimitados',
        'Gmail completo',
        'Calendário avançado',
        'Notion completo',
        'Slack integração',
        'Pesquisa web',
        'Suporte prioritário',
        'LinkedIn scraping'
      ],
      isPopular: true,
      isCurrentPlan: profile?.plan === 'premium'
    }
  ]

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'WhatsApp Nativo',
      description: 'Funciona diretamente no seu WhatsApp, sem apps extras'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Gmail Inteligente',
      description: 'Leia, envie e organize emails com comandos simples'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Calendário Automático',
      description: 'Agende reuniões e consulte agenda instantaneamente'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Notion Integrado',
      description: 'Gerencie tarefas e projetos sem sair do WhatsApp'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Segurança Total',
      description: 'Seus dados protegidos com criptografia de ponta'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: 'Suporte 24/7',
      description: 'Ajuda sempre que precisar, em português'
    }
  ]

  const faqs = [
    {
      question: 'Como funciona o período gratuito?',
      answer: 'Você tem 7 dias para testar todas as funcionalidades premium sem custo. Não é necessário cartão de crédito para começar.'
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento ou multas.'
    },
    {
      question: 'Meus dados estão seguros?',
      answer: 'Absolutamente. Usamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança. Seus dados nunca são compartilhados.'
    },
    {
      question: 'Funciona com qualquer número do WhatsApp?',
      answer: 'Sim, o Chronus funciona com qualquer número do WhatsApp. Basta seguir o processo de configuração inicial.'
    },
    {
      question: 'Há limite de comandos no plano gratuito?',
      answer: 'O plano gratuito inclui até 50 comandos por mês. O plano premium oferece comandos ilimitados.'
    },
    {
      question: 'Como funciona o suporte?',
      answer: 'Oferecemos suporte por email para todos os usuários. Usuários premium têm acesso ao suporte prioritário com resposta em até 2 horas.'
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Escolha o plano ideal para você
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comece gratuitamente e evolua conforme suas necessidades. 
              Todos os planos incluem 7 dias de teste grátis.
            </p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Mensal
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Anual
              </span>
              {isAnnual && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Economize 17%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <PricingCard
                  name={plan.name}
                  description={plan.description}
                  price={plan.price}
                  priceId={plan.priceId}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  isCurrentPlan={plan.isCurrentPlan}
                  isAnnual={isAnnual}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa incluído
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recursos poderosos para transformar sua produtividade através do WhatsApp
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre o Chronus
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Experimente o Chronus gratuitamente por 7 dias. Sem cartão de crédito necessário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Começar Teste Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/login" className="btn-secondary glass-effect text-white border-white/30 hover:bg-white/20">
                Já tenho conta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PricingPage