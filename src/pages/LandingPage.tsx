import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Clock, 
  MessageSquare, 
  Calendar, 
  Mail, 
  FileText, 
  Zap, 
  Shield, 
  Smartphone,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Gestão de Email",
      description: "Leia, envie e organize seus emails do Gmail através de comandos simples no WhatsApp."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Calendário Inteligente",
      description: "Agende reuniões, consulte sua agenda e receba lembretes automáticos."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Tarefas no Notion",
      description: "Gerencie suas tarefas e projetos no Notion com comandos de voz ou texto."
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "WhatsApp Integrado",
      description: "Tudo funciona através do WhatsApp - sem apps extras para instalar."
    }
  ]

  const benefits = [
    "Economize até 3 horas por dia",
    "Integração com suas ferramentas favoritas",
    "Comandos por voz e texto",
    "Disponível 24/7",
    "Segurança e privacidade garantidas",
    "Suporte em português"
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content: "O Chronus revolucionou minha produtividade. Agora consigo gerenciar tudo pelo WhatsApp!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Freelancer",
      content: "Incrível como posso organizar minha agenda e emails sem sair do WhatsApp.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Gerente de Projetos",
      content: "A integração com o Notion é perfeita. Minhas tarefas sempre organizadas.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Seu Assistente
                <span className="block text-yellow-300">Pessoal com IA</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Gerencie emails, calendário, tarefas e muito mais através do WhatsApp. 
                Deixe a inteligência artificial cuidar da sua produtividade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/pricing" className="btn-secondary glass-effect text-white border-white/30 hover:bg-white/20">
                  Ver Preços
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>7 dias grátis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Sem cartão de crédito</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-sm text-blue-100">Chronus Assistant</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-3 ml-8">
                    <p className="text-sm">"Agende uma reunião com João para amanhã às 14h"</p>
                  </div>
                  <div className="bg-primary-500/30 rounded-lg p-3 mr-8">
                    <p className="text-sm">✅ Reunião agendada com João para 15/01 às 14h. Convite enviado por email!</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
            </motion.div>
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
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integre suas ferramentas favoritas e gerencie tudo através do WhatsApp com inteligência artificial.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Por que escolher o Chronus?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Mais do que um assistente, é seu parceiro de produtividade que entende suas necessidades.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Produtividade Diária</h3>
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Emails processados</span>
                    <span className="font-semibold text-primary-600">+150%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tempo economizado</span>
                    <span className="font-semibold text-green-600">3h/dia</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tarefas organizadas</span>
                    <span className="font-semibold text-blue-600">100%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-600">
              Milhares de pessoas já transformaram sua produtividade com o Chronus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
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
              Pronto para transformar sua produtividade?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Comece gratuitamente hoje e descubra como o Chronus pode revolucionar sua rotina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Começar Grátis Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn-secondary glass-effect text-white border-white/30 hover:bg-white/20">
                Ver Todos os Planos
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              Sem compromisso • Cancele quando quiser • Suporte 24/7
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage