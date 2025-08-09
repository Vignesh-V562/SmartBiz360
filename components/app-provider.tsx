'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  currentLanguage: string
  setCurrentLanguage: (lang: string) => void
  businessData: any
  setBusinessData: (data: any) => void
  notifications: any[]
  addNotification: (notification: any) => void
  removeNotification: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [businessData, setBusinessData] = useState({})
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification: any) => {
    setNotifications(prev => [...prev, { ...notification, id: Date.now().toString() }])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <AppContext.Provider value={{
      currentLanguage,
      setCurrentLanguage,
      businessData,
      setBusinessData,
      notifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
