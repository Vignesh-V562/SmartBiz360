'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Receipt, Package, Users, TrendingUp, AlertTriangle, MessageSquare, Mic, Plus, Search, Bell, Settings, Menu, IndianRupee, ShoppingCart, Phone, Calendar, Globe, Wifi, Crown, Zap, Home, FileText, CreditCard, Truck, Building, PieChart, Brain } from 'lucide-react'
import { BillingModule } from '@/components/billing-module'
import { InventoryModule } from '@/components/inventory-module'
import { CRMModule } from '@/components/crm-module'
import { AIAssistant } from '@/components/ai-assistant'
import { VoiceInput } from '@/components/voice-input'
import { AnalyticsModule } from '@/components/analytics-module'
import { PaymentModule } from '@/components/payment-module'
import { ReportsModule } from '@/components/reports-module'
import { SettingsModule } from '@/components/settings-module'
import { NotificationCenter } from '@/components/notification-center'
import { LanguageSelector } from '@/components/language-selector'
import { OfflineIndicator } from '@/components/offline-indicator'
import { BusinessInsightsChat } from '@/components/business-insights-chat'
import { BankLoanSupport } from '@/components/bank-loan-support'
import { EcommerceIntegration } from '@/components/ecommerce-integration'
import { VisualReportsDashboard } from '@/components/visual-reports-dashboard'
import { useApp } from '@/components/app-provider'

interface DashboardProps {
  businessType: string
  enabledModules: string[]
}

export function Dashboard({ businessType, enabledModules }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const { notifications, currentLanguage } = useApp()

  const todayStats = {
    sales: 12500,
    orders: 23,
    customers: 18,
    profit: 3200,
    growth: 15.2
  }

  const alerts = [
    { id: '1', type: 'warning', message: 'Low stock: Rice (5kg) - Only 3 left', module: 'inventory', timestamp: new Date() },
    { id: '2', type: 'info', message: '5 customers haven\'t visited in 30 days', module: 'crm', timestamp: new Date() },
    { id: '3', type: 'success', message: 'Monthly target 80% achieved!', module: 'analytics', timestamp: new Date() },
    { id: '4', type: 'payment', message: 'Payment of ₹2,500 received from Rajesh Kumar', module: 'payment', timestamp: new Date() },
    { id: '5', type: 'loan', message: 'Loan pre-approval available - ₹12L at 9.5%', module: 'banking', timestamp: new Date() },
    { id: '6', type: 'ecommerce', message: 'New order from Amazon - ₹850', module: 'ecommerce', timestamp: new Date() }
  ]

  const quickActions = [
    { id: 'new-bill', label: 'New Bill', icon: Receipt, module: 'billing', color: 'bg-green-500' },
    { id: 'add-stock', label: 'Add Stock', icon: Package, module: 'inventory', color: 'bg-blue-500' },
    { id: 'add-customer', label: 'Add Customer', icon: Users, module: 'crm', color: 'bg-purple-500' },
    { id: 'view-analytics', label: 'Analytics', icon: BarChart3, module: 'analytics', color: 'bg-orange-500' },
    { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, module: 'ai-chat', color: 'bg-pink-500' },
    { id: 'generate-report', label: 'Reports', icon: FileText, module: 'reports', color: 'bg-indigo-500' },
    { id: 'process-payment', label: 'Payment', icon: CreditCard, module: 'payment', color: 'bg-emerald-500' },
    { id: 'bank-loan', label: 'Bank Loan', icon: Building, module: 'banking', color: 'bg-yellow-500' },
    { id: 'ecommerce', label: 'E-commerce', icon: Globe, module: 'ecommerce', color: 'bg-cyan-500' },
    { id: 'visual-reports', label: 'Visual Reports', icon: PieChart, module: 'visual-reports', color: 'bg-red-500' }
  ]

  const recentActivity = [
    { id: '1', type: 'sale', title: 'Bill #1234 - ₹850', subtitle: 'Customer: Rajesh Kumar', time: '2 min ago', icon: Receipt, color: 'text-green-600' },
    { id: '2', type: 'stock', title: 'Stock added: Basmati Rice 25kg', subtitle: 'Quantity: 10 bags', time: '15 min ago', icon: Package, color: 'text-blue-600' },
    { id: '3', type: 'customer', title: 'New customer registered', subtitle: 'Priya Sharma', time: '1 hour ago', icon: Users, color: 'text-purple-600' },
    { id: '4', type: 'payment', title: 'Payment received - ₹2,500', subtitle: 'UPI from Amit Singh', time: '2 hours ago', icon: CreditCard, color: 'text-emerald-600' },
    { id: '5', type: 'ecommerce', title: 'Amazon order shipped', subtitle: 'Order #AMZ001234', time: '3 hours ago', icon: Globe, color: 'text-cyan-600' },
    { id: '6', type: 'ai', title: 'AI recommendation generated', subtitle: 'Inventory optimization suggestions', time: '4 hours ago', icon: Brain, color: 'text-pink-600' }
  ]

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'new-bill':
        setActiveTab('billing')
        break
      case 'add-stock':
        setActiveTab('inventory')
        break
      case 'add-customer':
        setActiveTab('crm')
        break
      case 'view-analytics':
        setActiveTab('analytics')
        break
      case 'ai-chat':
        setActiveTab('ai-chat')
        break
      case 'generate-report':
        setActiveTab('reports')
        break
      case 'process-payment':
        setActiveTab('payment')
        break
      case 'bank-loan':
        setActiveTab('banking')
        break
      case 'ecommerce':
        setActiveTab('ecommerce')
        break
      case 'visual-reports':
        setActiveTab('visual-reports')
        break
      default:
        console.log('Action:', actionId)
    }
  }

  const getTabsForModules = () => {
    const tabs = [
      { id: 'overview', label: 'Overview', icon: Home }
    ]

    if (enabledModules.includes('billing')) {
      tabs.push({ id: 'billing', label: 'Billing', icon: Receipt })
    }
    if (enabledModules.includes('inventory')) {
      tabs.push({ id: 'inventory', label: 'Inventory', icon: Package })
    }
    if (enabledModules.includes('crm')) {
      tabs.push({ id: 'crm', label: 'Customers', icon: Users })
    }
    if (enabledModules.includes('analytics')) {
      tabs.push({ id: 'analytics', label: 'Analytics', icon: BarChart3 })
    }
    if (enabledModules.includes('payment')) {
      tabs.push({ id: 'payment', label: 'Payments', icon: CreditCard })
    }
    if (enabledModules.includes('reports')) {
      tabs.push({ id: 'reports', label: 'Reports', icon: FileText })
    }
    
    // New advanced features
    tabs.push({ id: 'ai-chat', label: 'AI Chat', icon: MessageSquare })
    tabs.push({ id: 'banking', label: 'Banking', icon: Building })
    tabs.push({ id: 'ecommerce', label: 'E-commerce', icon: Globe })
    tabs.push({ id: 'visual-reports', label: 'Visual Reports', icon: PieChart })

    return tabs
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg">SmartBiz360</h1>
              <p className="text-xs text-gray-500 capitalize">{businessType} Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <OfflineIndicator isOnline={isOnline} />
            
            {enabledModules.includes('multilingual') && (
              <LanguageSelector />
            )}
            
            {enabledModules.includes('voice') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVoiceInput(true)}
                className="bg-blue-50 border-blue-200"
              >
                <Mic className="w-4 h-4 text-blue-600" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-4 h-4" />
              {alerts.length > 0 && (
                <Badge className="ml-1 h-4 w-4 p-0 text-xs">{alerts.length}</Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Sales</p>
                  <p className="text-xl font-bold text-green-600">₹{todayStats.sales.toLocaleString()}</p>
                </div>
                <IndianRupee className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="text-xl font-bold text-blue-600">{todayStats.orders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Customers</p>
                  <p className="text-xl font-bold text-purple-600">{todayStats.customers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profit</p>
                  <p className="text-xl font-bold text-orange-600">₹{todayStats.profit.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Growth</p>
                  <p className="text-xl font-bold text-emerald-600">+{todayStats.growth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-amber-50 border-amber-400' :
                  alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                  alert.type === 'payment' ? 'bg-emerald-50 border-emerald-400' :
                  alert.type === 'loan' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'ecommerce' ? 'bg-cyan-50 border-cyan-400' :
                  'bg-green-50 border-green-400'
                }`}>
                  <p className="text-sm">{alert.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="text-xs">{alert.module}</Badge>
                    <span className="text-xs text-gray-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {alerts.length > 4 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setShowNotifications(true)}
                >
                  View all {alerts.length} notifications
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${getTabsForModules().length}, 1fr)` }}>
            {getTabsForModules().map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-1">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Frequently used features for your business</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {quickActions
                      .filter(action => enabledModules.includes(action.module) || ['billing', 'ai-chat', 'banking', 'ecommerce', 'visual-reports'].includes(action.module))
                      .map((action) => {
                        const Icon = action.icon
                        return (
                          <Button
                            key={action.id}
                            variant="outline"
                            className="h-20 flex-col hover:shadow-md transition-all"
                            onClick={() => handleQuickAction(action.id)}
                          >
                            <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm">{action.label}</span>
                          </Button>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your business</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <Icon className={`w-5 h-5 ${activity.color}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.subtitle} • {activity.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              {enabledModules.includes('analytics') && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Business Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">📈 Sales Trend</h4>
                        <p className="text-sm text-blue-800">Your sales are up 15% this week. Rice and Dal are your top performers.</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">💡 Recommendation</h4>
                        <p className="text-sm text-green-800">Consider bundling Rice + Dal + Oil for better margins.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2">👥 Customer Insight</h4>
                        <p className="text-sm text-purple-800">VIP customers spend 3x more. Focus on loyalty programs.</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-medium text-orange-900 mb-2">🏦 Banking Opportunity</h4>
                        <p className="text-sm text-orange-800">You're pre-approved for ₹12L business loan at 9.5% interest.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Button 
                        className="w-full"
                        onClick={() => setShowAIAssistant(true)}
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Ask AI Assistant
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab('ai-chat')}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Open AI Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {enabledModules.includes('billing') && (
            <TabsContent value="billing">
              <BillingModule businessType={businessType} />
            </TabsContent>
          )}

          {enabledModules.includes('inventory') && (
            <TabsContent value="inventory">
              <InventoryModule businessType={businessType} />
            </TabsContent>
          )}

          {enabledModules.includes('crm') && (
            <TabsContent value="crm">
              <CRMModule businessType={businessType} />
            </TabsContent>
          )}

          {enabledModules.includes('analytics') && (
            <TabsContent value="analytics">
              <AnalyticsModule businessType={businessType} />
            </TabsContent>
          )}

          {enabledModules.includes('payment') && (
            <TabsContent value="payment">
              <PaymentModule businessType={businessType} />
            </TabsContent>
          )}

          {enabledModules.includes('reports') && (
            <TabsContent value="reports">
              <ReportsModule businessType={businessType} />
            </TabsContent>
          )}

          {/* New Advanced Features */}
          <TabsContent value="ai-chat">
            <BusinessInsightsChat businessType={businessType} />
          </TabsContent>

          <TabsContent value="banking">
            <BankLoanSupport businessType={businessType} />
          </TabsContent>

          <TabsContent value="ecommerce">
            <EcommerceIntegration businessType={businessType} />
          </TabsContent>

          <TabsContent value="visual-reports">
            <VisualReportsDashboard businessType={businessType} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showVoiceInput && (
        <VoiceInput onClose={() => setShowVoiceInput(false)} />
      )}

      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}

      {showNotifications && (
        <NotificationCenter 
          notifications={alerts}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {showSettings && (
        <SettingsModule 
          businessType={businessType}
          enabledModules={enabledModules}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Enhanced Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <div className="relative">
          <Button 
            size="lg" 
            className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setShowAIAssistant(true)}
          >
            <Brain className="w-6 h-6" />
          </Button>
          {enabledModules.includes('voice') && (
            <Button
              size="sm"
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 rounded-full w-10 h-10 bg-red-500 hover:bg-red-600"
              onClick={() => setShowVoiceInput(true)}
            >
              <Mic className="w-4 h-4" />
            </Button>
          )}
          <Button
            size="sm"
            className="absolute -top-12 -left-12 rounded-full w-10 h-10 bg-green-500 hover:bg-green-600"
            onClick={() => setActiveTab('ai-chat')}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
