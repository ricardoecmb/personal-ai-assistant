import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  plan: 'free' | 'premium'
  planExpiry?: Date
  integrations: {
    gmail: boolean
    calendar: boolean
    notion: boolean
    whatsapp: boolean
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular verificação de autenticação
    const savedUser = localStorage.getItem('chronus_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simular usuário de exemplo
    if (email === 'demo@chronus.com' && password === 'demo123') {
      const demoUser: User = {
        id: '1',
        name: 'Usuário Demo',
        email: 'demo@chronus.com',
        plan: 'free',
        planExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        integrations: {
          gmail: false,
          calendar: false,
          notion: false,
          whatsapp: true
        }
      }
      setUser(demoUser)
      localStorage.setItem('chronus_user', JSON.stringify(demoUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      plan: 'free',
      planExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias grátis
      integrations: {
        gmail: false,
        calendar: false,
        notion: false,
        whatsapp: true
      }
    }
    
    setUser(newUser)
    localStorage.setItem('chronus_user', JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('chronus_user')
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('chronus_user', JSON.stringify(updatedUser))
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}