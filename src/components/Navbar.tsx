import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Chronus</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              Início
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
              Preços
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
              Entrar
            </Link>
            <Link to="/register" className="btn-primary">
              Começar Grátis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/pricing" 
                className="block text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Preços
              </Link>
              <Link 
                to="/login" 
                className="block text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Entrar
              </Link>
              <Link 
                to="/register" 
                className="block btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                Começar Grátis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar