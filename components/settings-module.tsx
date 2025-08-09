'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Settings, User, Building, Bell, Shield, Palette, Globe, Smartphone, Cloud, Download, Upload, Trash2, Edit, Save } from 'lucide-react'
import { useApp } from '@/components/app-provider'

interface SettingsModuleProps {
  businessType: string
  enabledModules: string[]
  onClose: () => void
}

export function SettingsModule({ businessType, enabledModules, onClose }: SettingsModuleProps) {
  const { currentLanguage, setCurrentLanguage } = useApp()
  const [businessName, setBusinessName] = useState('SmartBiz Store')
  const [ownerName, setOwnerName] = useState('Rajesh Kumar')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [email, setEmail] = useState('rajesh@smartbizstore.com')
  const [address, setAddress] = useState('123 Main Street, Mumbai, Maharashtra')
  const [gstNumber, setGstNumber] = useState('27XXXXX1234X1ZX')

  const [notifications, setNotifications] = useState({
    lowStock: true,
    newCustomer: true,
    dailyReport: true,
    paymentReceived: true,
    whatsappMessages: false,
    emailReports: true
  })

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    locationTracking: false,
    customerData: true
  })

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' }
  ]

  const themes = [
    { id: 'light', name: 'Light', description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
    { id: 'auto', name: 'Auto', description: 'Follows system preference' }
  ]

  const moduleSettings = [
    { id: 'billing', name: 'Smart Billing', enabled: enabledModules.includes('billing'), description: 'GST-compliant digital bills' },
    { id: 'inventory', name: 'Inventory Management', enabled: enabledModules.includes('inventory'), description: 'Stock tracking and alerts' },
    { id: 'crm', name: 'Customer Management', enabled: enabledModules.includes('crm'), description: 'Customer database and communication' },
    { id: 'analytics', name: 'AI Analytics', enabled: enabledModules.includes('analytics'), description: 'Business insights and forecasting' },
    { id: 'voice', name: 'Voice Assistant', enabled: enabledModules.includes('voice'), description: 'Voice commands and input' },
    { id: 'multilingual', name: 'Multi-language', enabled: enabledModules.includes('multilingual'), description: 'Regional language support' },
    { id: 'offline', name: 'Offline Mode', enabled: enabledModules.includes('offline'), description: 'Work without internet' },
    { id: 'payment', name: 'Payment Gateway', enabled: enabledModules.includes('payment'), description: 'Accept digital payments' }
  ]

  const handleSave = () => {
    console.log('Saving settings...')
    // Save settings logic here
    onClose()
  }

  const handleExportData = () => {
    console.log('Exporting business data...')
    // Export data logic
  }

  const handleImportData = () => {
    console.log('Importing business data...')
    // Import data logic
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Settings
              </CardTitle>
              <CardDescription>Manage your SmartBiz360 preferences and configuration</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="business" className="h-full flex flex-col">
            <TabsList className="mx-6 mb-4">
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <TabsContent value="business" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">Business Type</Label>
                        <Input
                          id="businessType"
                          value={businessType}
                          disabled
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ownerName">Owner Name</Label>
                        <Input
                          id="ownerName"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gstNumber">GST Number</Label>
                        <Input
                          id="gstNumber"
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Business Address</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add extra security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Change
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="modules" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Module Management</CardTitle>
                    <CardDescription>Enable or disable features for your business</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {moduleSettings.map((module) => (
                        <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-medium">{module.name}</h4>
                              <Badge variant={module.enabled ? 'default' : 'secondary'}>
                                {module.enabled ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                          </div>
                          <Switch
                            checked={module.enabled}
                            disabled={module.id === 'billing'} // Core module always enabled
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>Choose what notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Low Stock Alerts</h4>
                          <p className="text-sm text-gray-500">Get notified when items are running low</p>
                        </div>
                        <Switch
                          checked={notifications.lowStock}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, lowStock: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">New Customer Registration</h4>
                          <p className="text-sm text-gray-500">Alert when new customers sign up</p>
                        </div>
                        <Switch
                          checked={notifications.newCustomer}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, newCustomer: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Daily Sales Report</h4>
                          <p className="text-sm text-gray-500">Receive daily business summary</p>
                        </div>
                        <Switch
                          checked={notifications.dailyReport}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, dailyReport: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Payment Received</h4>
                          <p className="text-sm text-gray-500">Notify when payments are received</p>
                        </div>
                        <Switch
                          checked={notifications.paymentReceived}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, paymentReceived: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">WhatsApp Messages</h4>
                          <p className="text-sm text-gray-500">Customer message notifications</p>
                        </div>
                        <Switch
                          checked={notifications.whatsappMessages}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, whatsappMessages: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Email Reports</h4>
                          <p className="text-sm text-gray-500">Receive reports via email</p>
                        </div>
                        <Switch
                          checked={notifications.emailReports}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, emailReports: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Language & Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label>Interface Language</Label>
                      <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              <div className="flex items-center space-x-2">
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Theme & Display
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Theme</Label>
                        <div className="grid grid-cols-1 gap-3 mt-2">
                          {themes.map((theme) => (
                            <div key={theme.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <h4 className="font-medium">{theme.name}</h4>
                                <p className="text-sm text-gray-500">{theme.description}</p>
                              </div>
                              <Switch defaultChecked={theme.id === 'light'} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Privacy & Security
                    </CardTitle>
                    <CardDescription>Control how your data is used and shared</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Data Sharing</h4>
                          <p className="text-sm text-gray-500">Share anonymized data to improve services</p>
                        </div>
                        <Switch
                          checked={privacy.dataSharing}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Usage Analytics</h4>
                          <p className="text-sm text-gray-500">Help us improve by sharing usage data</p>
                        </div>
                        <Switch
                          checked={privacy.analytics}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, analytics: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Location Tracking</h4>
                          <p className="text-sm text-gray-500">Use location for delivery and analytics</p>
                        </div>
                        <Switch
                          checked={privacy.locationTracking}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, locationTracking: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Customer Data Processing</h4>
                          <p className="text-sm text-gray-500">Process customer data for insights</p>
                        </div>
                        <Switch
                          checked={privacy.customerData}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, customerData: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Cloud className="w-5 h-5 mr-2" />
                      Data Management
                    </CardTitle>
                    <CardDescription>Backup, export, and manage your business data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-16 flex-col" onClick={handleExportData}>
                        <Download className="w-5 h-5 mb-2" />
                        <span>Export Data</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col" onClick={handleImportData}>
                        <Upload className="w-5 h-5 mb-2" />
                        <span>Import Data</span>
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">⚠️ Data Backup</h4>
                      <p className="text-sm text-yellow-700 mb-3">
                        Last backup: 2 days ago. Regular backups ensure your data is safe.
                      </p>
                      <Button size="sm" variant="outline">
                        Backup Now
                      </Button>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">🗑️ Danger Zone</h4>
                      <p className="text-sm text-red-700 mb-3">
                        Permanently delete all your business data. This action cannot be undone.
                      </p>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-3 h-3 mr-2" />
                        Delete All Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex-shrink-0 p-6 border-t bg-gray-50">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
