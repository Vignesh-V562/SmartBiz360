'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Receipt, Package, Users, BarChart3, Mic, MessageSquare, Globe, Wifi, Crown, Zap } from 'lucide-react'

interface ModuleSelectionProps {
  businessType: string
  onModulesSelect: (modules: string[]) => void
}

const modules = [
  {
    id: 'billing',
    name: 'Smart Billing',
    description: 'GST-compliant digital bills with tap-to-print',
    icon: Receipt,
    category: 'core',
    recommended: true,
    features: ['GST compliance', 'Digital receipts', 'Print support', 'Invoice templates']
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    description: 'Stock tracking with AI-powered alerts',
    icon: Package,
    category: 'core',
    recommended: true,
    features: ['Stock alerts', 'Expiry tracking', 'Low stock warnings', 'Barcode scanning']
  },
  {
    id: 'crm',
    name: 'Customer Management',
    description: 'Auto-capture customers with SMS/WhatsApp',
    icon: Users,
    category: 'core',
    recommended: true,
    features: ['Customer database', 'WhatsApp integration', 'SMS campaigns', 'Loyalty tracking']
  },
  {
    id: 'analytics',
    name: 'AI Insights',
    description: 'Visual dashboard with profit forecasts',
    icon: BarChart3,
    category: 'premium',
    recommended: false,
    features: ['Sales analytics', 'Profit forecasting', 'Top sellers', 'Growth trends']
  },
  {
    id: 'voice',
    name: 'Voice Assistant',
    description: 'Voice commands in regional languages',
    icon: Mic,
    category: 'premium',
    recommended: false,
    features: ['Voice input', 'Regional languages', 'Hands-free operation', 'Voice search']
  },
  {
    id: 'communication',
    name: 'Smart Communication',
    description: 'Automated WhatsApp/SMS for customers',
    icon: MessageSquare,
    category: 'premium',
    recommended: false,
    features: ['Auto reminders', 'Bulk messaging', 'Templates', 'Delivery tracking']
  },
  {
    id: 'multilingual',
    name: 'Multi-language Support',
    description: 'Interface in English, Tamil, and more',
    icon: Globe,
    category: 'addon',
    recommended: false,
    features: ['Tamil support', 'Hindi support', 'Regional scripts', 'Voice in local language']
  },
  {
    id: 'offline',
    name: 'Offline Mode',
    description: 'Work without internet connection',
    icon: Wifi,
    category: 'addon',
    recommended: true,
    features: ['Offline billing', 'Local storage', 'Sync when online', 'No internet required']
  }
]

export function ModuleSelection({ businessType, onModulesSelect }: ModuleSelectionProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>(['billing', 'inventory', 'crm', 'offline'])

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const coreModules = modules.filter(m => m.category === 'core')
  const premiumModules = modules.filter(m => m.category === 'premium')
  const addonModules = modules.filter(m => m.category === 'addon')

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Customize Your SmartBiz360
        </h1>
        <p className="text-gray-600 mb-4">
          Select the modules you need for your {businessType} business
        </p>
        <Badge variant="outline" className="text-sm">
          You can change these anytime later
        </Badge>
      </div>

      {/* Core Modules */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Core Features</CardTitle>
            <Badge className="bg-blue-100 text-blue-800">Essential</Badge>
          </div>
          <CardDescription>
            Essential tools every business needs - included in free plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {coreModules.map((module) => {
            const Icon = module.icon
            return (
              <div key={module.id} className="flex items-start space-x-4 p-4 border rounded-lg bg-blue-50/50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{module.name}</h3>
                      {module.recommended && (
                        <Badge variant="secondary" className="text-xs">Recommended</Badge>
                      )}
                    </div>
                    <Switch
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {module.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Premium Modules */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-lg">Premium Features</CardTitle>
            <Badge className="bg-amber-100 text-amber-800">Upgrade</Badge>
          </div>
          <CardDescription>
            Advanced AI-powered tools for growing businesses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {premiumModules.map((module) => {
            const Icon = module.icon
            return (
              <div key={module.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{module.name}</h3>
                    <Switch
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {module.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Add-on Modules */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Additional Features</CardTitle>
          <CardDescription>
            Extra capabilities to enhance your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {addonModules.map((module) => {
            const Icon = module.icon
            return (
              <div key={module.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{module.name}</h3>
                      {module.recommended && (
                        <Badge variant="secondary" className="text-xs">Recommended</Badge>
                      )}
                    </div>
                    <Switch
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {module.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Summary and Continue */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Selected Modules: {selectedModules.length}</h3>
              <p className="text-sm text-gray-600">
                {selectedModules.filter(id => modules.find(m => m.id === id)?.category === 'core').length} Core + {' '}
                {selectedModules.filter(id => modules.find(m => m.id === id)?.category === 'premium').length} Premium + {' '}
                {selectedModules.filter(id => modules.find(m => m.id === id)?.category === 'addon').length} Add-ons
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">Free</p>
              <p className="text-xs text-gray-500">for first 50 customers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={() => onModulesSelect(selectedModules)}
          size="lg"
          className="px-8"
        >
          Start Using SmartBiz360 →
        </Button>
      </div>
    </div>
  )
}
