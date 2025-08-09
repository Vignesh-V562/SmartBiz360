'use client'

import { useState, useEffect } from 'react'
import { OnboardingFlow } from '@/components/onboarding-flow'
import { Dashboard } from '@/components/dashboard'
import { ModuleSelection } from '@/components/module-selection'
import { AppProvider } from '@/components/app-provider'

export default function SmartBiz360App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'modules' | 'dashboard'>('onboarding')
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleBusinessSelect = (businessType: string) => {
    setSelectedBusiness(businessType)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen('modules')
    }, 1500)
  }

  const handleModulesSelect = (modules: string[]) => {
    setSelectedModules(modules)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen('dashboard')
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Setting up SmartBiz360...</h2>
          <p className="text-gray-600">Customizing your business toolkit</p>
        </div>
      </div>
    )
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {currentScreen === 'onboarding' && (
          <OnboardingFlow onBusinessSelect={handleBusinessSelect} />
        )}
        {currentScreen === 'modules' && (
          <ModuleSelection 
            businessType={selectedBusiness}
            onModulesSelect={handleModulesSelect}
          />
        )}
        {currentScreen === 'dashboard' && (
          <Dashboard 
            businessType={selectedBusiness}
            enabledModules={selectedModules}
          />
        )}
      </div>
    </AppProvider>
  )
}
