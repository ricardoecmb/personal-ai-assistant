import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Check, 
  X, 
  Zap, 
  Crown, 
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

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Gratuito',
      description: 'Perfeito para começar',
      price: { monthly: 0, annual: 0 },
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      features: [
        { name: 'WhatsApp integrado', included: true },
        { name: 'Até 50 comandos/mês', included: true },
        { name: 'Gmail básico', included: true },
        { name: 'Calendário básico', included: true },
        { name: 'Suporte por email', included: true },
        { name: 'Notion integração', included: false },
        { name: 'Comandos ilimitados', included: false },
        { name: 'Suporte prioritário', included: false },
        { name: 'Integrações avançadas', included: false }
      ],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Premium',
      description: 'Para máxima produtividade',
      price: { monthly: 29.90, annual: 299.90 },
      icon: <Crown className="h-8 w-8" />,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      features: [
        { name: 'WhatsApp integrado', included: true },
        { name: 'Comandos ilimitados', included: true },
        { name: 'Gmail completo', included: true },
        { name: 'Calendário avançado', included: true },
        { name: 'Notion completo', included: true },
        { name: 'Slack integração', included: true },
        { name: 'Pesquisa web', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'LinkedIn scraping', included: true }
      ],
      cta: 'Começar Teste Grátis',
      popular: true
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
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  plan.popular ? 'border-primary-200 ring-4 ring-primary-100' : 'border-gray-200'
                } p-8 ${plan.popular ? 'transform scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${plan.bgColor} ${plan.color} mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-600">
                        /{isAnnual ? 'ano' : 'mês'}
                      </span>
                    )}
                  </div>
                  <Link
                    to="/register"
                    className={`w-full inline-flex justify-center items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
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