'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { ShoppingCart, Globe, Smartphone, TrendingUp, Package, Users, IndianRupee, Settings, Zap, CheckCircle, Clock, AlertTriangle, ExternalLink, Download, Upload, FolderSyncIcon as Sync, BarChart3 } from 'lucide-react'

interface EcommerceIntegrationProps {
  businessType: string
}

export function EcommerceIntegration({ businessType }: EcommerceIntegrationProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['amazon', 'flipkart'])
  const [syncInProgress, setSyncInProgress] = useState(false)
  const [autoSync, setAutoSync] = useState(true)

  const ecommercePlatforms = [
    {
      id: 'amazon',
      name: 'Amazon',
      logo: '🛒',
      description: 'India\'s largest online marketplace',
      status: 'connected',
      orders: 145,
      revenue: 85000,
      commission: 8.5,
      features: ['FBA Support', 'Prime Eligible', 'Global Reach']
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      logo: '🛍️',
      description: 'Leading Indian e-commerce platform',
      status: 'connected',
      orders: 98,
      revenue: 62000,
      commission: 7.5,
      features: ['Flipkart Assured', 'Same Day Delivery', 'Easy Returns']
    },
    {
      id: 'myntra',
      name: 'Myntra',
      logo: '👕',
      description: 'Fashion and lifestyle marketplace',
      status: 'available',
      orders: 0,
      revenue: 0,
      commission: 12.0,
      features: ['Fashion Focus', 'Brand Partnership', 'Trend Analytics']
    },
    {
 
      id: 'meesho',
      name: 'Meesho',
      logo: '🏪',
      description: 'Social commerce platform',
      status: 'available',
      orders: 0,
      revenue: 0,
      commission: 5.0,
      features: ['Zero Commission', 'Social Selling', 'Bulk Orders']
    },
    {
      id: 'jiomart',
      name: 'JioMart',
      logo: '🛒',
      description: 'Reliance\'s online grocery platform',
      status: 'available',
      orders: 0,
      revenue: 0,
      commission: 6.0,
      features: ['Grocery Focus', 'Local Delivery', 'Bulk Discounts']
    },
    {
      id: 'paytmmall',
      name: 'Paytm Mall',
      logo: '💳',
      description: 'Digital payments integrated marketplace',
      status: 'available',
      orders: 0,
      revenue: 0,
      commission: 9.0,
      features: ['Cashback Offers', 'Digital Payments', 'Quick Listing']
    }
  ]

  const integrationStats = {
    totalOrders: 243,
    totalRevenue: 147000,
    avgOrderValue: 605,
    conversionRate: 3.2,
    platformCount: 2,
    monthlyGrowth: 18.5
  }

  const productSyncStatus = [
    { category: 'Grocery Items', synced: 45, total: 50, status: 'synced' },
    { category: 'Personal Care', synced: 12, total: 15, status: 'syncing' },
    { category: 'Household Items', synced: 8, total: 12, status: 'pending' },
    { category: 'Beverages', synced: 20, total: 20, status: 'synced' }
  ]

  const recentOrders = [
    {
      id: 'AMZ001234',
      platform: 'Amazon',
      customer: 'Rajesh Kumar',
      amount: 850,
      status: 'shipped',
      items: 3,
      date: '2024-02-08'
    },
    {
      id: 'FLK005678',
      platform: 'Flipkart',
      customer: 'Priya Sharma',
      amount: 1200,
      status: 'delivered',
      items: 5,
      date: '2024-02-07'
    },
    {
      id: 'AMZ001235',
      platform: 'Amazon',
      customer: 'Amit Singh',
      amount: 650,
      status: 'processing',
      items: 2,
      date: '2024-02-08'
    }
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handleSync = () => {
    setSyncInProgress(true)
    setTimeout(() => {
      setSyncInProgress(false)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'syncing': return 'bg-yellow-100 text-yellow-800'
      case 'available': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                E-commerce Integration Hub
              </CardTitle>
              <CardDescription>
                Connect your {businessType} with major online marketplaces
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-100 text-blue-800">
                {integrationStats.platformCount} Platforms Connected
              </Badge>
              <Button 
                onClick={handleSync}
                disabled={syncInProgress}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {syncInProgress ? (
                  <>
                    <Sync className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Sync className="w-4 h-4 mr-2" />
                    Sync All
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">{integrationStats.totalOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Online Revenue</p>
                <p className="text-xl font-bold text-green-600">₹{integrationStats.totalRevenue.toLocaleString()}</p>
              </div>
              <IndianRupee className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-xl font-bold text-purple-600">₹{integrationStats.avgOrderValue}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-xl font-bold text-orange-600">{integrationStats.conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platforms</p>
                <p className="text-xl font-bold text-indigo-600">{integrationStats.platformCount}</p>
              </div>
              <Globe className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-xl font-bold text-emerald-600">+{integrationStats.monthlyGrowth}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="products">Product Sync</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecommercePlatforms.map((platform) => (
              <Card key={platform.id} className={`transition-all hover:shadow-md ${
                platform.status === 'connected' ? 'ring-2 ring-green-200 bg-green-50' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{platform.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <CardDescription className="text-sm">{platform.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(platform.status)}>
                      {platform.status === 'connected' ? 'Connected' : 
                       platform.status === 'syncing' ? 'Syncing' : 'Available'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platform.status === 'connected' && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Orders:</span>
                        <p className="font-medium">{platform.orders}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Revenue:</span>
                        <p className="font-medium text-green-600">₹{platform.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Commission:</span>
                        <p className="font-medium">{platform.commission}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <p className="font-medium text-green-600">Active</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Features:</h5>
                    <div className="flex flex-wrap gap-1">
                      {platform.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {platform.status === 'connected' ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Store
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => handlePlatformToggle(platform.id)}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Connect Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Setup Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🚀 Quick Setup Guide</CardTitle>
              <CardDescription>Get started with e-commerce integration in minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h4 className="font-medium">Connect Platforms</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Link your business accounts with major e-commerce platforms using secure API connections.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <h4 className="font-medium">Sync Products</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Automatically sync your inventory, prices, and product details across all platforms.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <h4 className="font-medium">Manage Orders</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Handle all orders from a single dashboard with automated inventory updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Product Sync Status</CardTitle>
                    <CardDescription>Real-time synchronization across platforms</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={autoSync}
                      onCheckedChange={setAutoSync}
                    />
                    <Label className="text-sm">Auto Sync</Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productSyncStatus.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {category.synced}/{category.total}
                          </span>
                          {category.status === 'synced' && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {category.status === 'syncing' && <Clock className="w-4 h-4 text-yellow-500 animate-spin" />}
                          {category.status === 'pending' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </div>
                      </div>
                      <Progress value={(category.synced / category.total) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Bulk Upload
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Products
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform-wise Product Distribution</CardTitle>
                <CardDescription>Products listed on each platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🛒</span>
                        <span className="font-medium">Amazon</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">85 Products</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Active:</span>
                        <p className="font-medium text-green-600">82</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Pending:</span>
                        <p className="font-medium text-yellow-600">3</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Rejected:</span>
                        <p className="font-medium text-red-600">0</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🛍️</span>
                        <span className="font-medium">Flipkart</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">78 Products</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Active:</span>
                        <p className="font-medium text-green-600">75</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Pending:</span>
                        <p className="font-medium text-yellow-600">2</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Rejected:</span>
                        <p className="font-medium text-red-600">1</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🏪</span>
                        <span className="font-medium">Meesho</span>
                      </div>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Connect to start listing products</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">💡 Optimization Tips</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use high-quality product images (min 1000x1000px)</li>
                    <li>• Write detailed product descriptions with keywords</li>
                    <li>• Keep inventory levels updated across platforms</li>
                    <li>• Monitor competitor pricing for better positioning</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Orders</CardTitle>
                  <CardDescription>Unified order management across all platforms</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Orders
                  </Button>
                  <Button size="sm">
                    <Package className="w-4 h-4 mr-2" />
                    Bulk Actions
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium">Order #{order.id}</h5>
                          <p className="text-sm text-gray-600">{order.platform} • {order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">₹{order.amount.toLocaleString()}</p>
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Items:</span>
                        <p className="font-medium">{order.items} products</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <p className="font-medium">{order.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Platform:</span>
                        <p className="font-medium">{order.platform}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Customer:</span>
                        <p className="font-medium">{order.customer}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Shipment
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today's Orders</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-xs text-green-600">+25% vs yesterday</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-yellow-600">5</p>
                    <p className="text-xs text-gray-600">Need attention</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Return Rate</p>
                    <p className="text-2xl font-bold text-green-600">2.1%</p>
                    <p className="text-xs text-green-600">Below industry avg</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Performance</CardTitle>
                <CardDescription>Revenue and order comparison across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🛒</span>
                        <span className="font-medium">Amazon</span>
                      </div>
                      <span className="font-bold text-green-600">₹85,000</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>145 orders • 8.5% commission</span>
                      <span>58% of total revenue</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🛍️</span>
                        <span className="font-medium">Flipkart</span>
                      </div>
                      <span className="font-bold text-blue-600">₹62,000</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>98 orders • 7.5% commission</span>
                      <span>42% of total revenue</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Growth Metrics</CardTitle>
                <CardDescription>Month-over-month performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Revenue Growth</p>
                    <p className="text-2xl font-bold text-green-800">+18.5%</p>
                    <p className="text-xs text-green-600">vs last month</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Order Growth</p>
                    <p className="text-2xl font-bold text-blue-800">+22.3%</p>
                    <p className="text-xs text-blue-600">vs last month</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600">New Customers</p>
                    <p className="text-2xl font-bold text-purple-800">47</p>
                    <p className="text-xs text-purple-600">this month</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600">Repeat Rate</p>
                    <p className="text-2xl font-bold text-orange-800">34%</p>
                    <p className="text-xs text-orange-600">customer retention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                AI-Powered E-commerce Insights
              </CardTitle>
              <CardDescription>Smart recommendations to boost your online sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📈 Revenue Optimization</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Your Amazon conversion rate is 15% higher than Flipkart. Consider promoting more products on Amazon.
                  </p>
                  <Button size="sm" variant="outline">
                    Optimize Listings
                  </Button>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Product Recommendations</h4>
                  <p className="text-sm text-green-800 mb-3">
                    Rice and Dal combo has 85% co-purchase rate. Create bundle offers to increase AOV.
                  </p>
                  <Button size="sm" variant="outline">
                    Create Bundles
                  </Button>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">📱 Platform Expansion</h4>
                  <p className="text-sm text-purple-800 mb-3">
                    Your grocery items would perform well on JioMart. Consider expanding to capture local market.
                  </p>
                  <Button size="sm" variant="outline">
                    Explore JioMart
                  </Button>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">⏰ Timing Optimization</h4>
                  <p className="text-sm text-orange-800 mb-3">
                    Orders peak at 7-9 PM. Schedule promotional campaigns during these hours for better results.
                  </p>
                  <Button size="sm" variant="outline">
                    Schedule Campaigns
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Integration Settings</CardTitle>
                <CardDescription>Configure your e-commerce platform connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">Auto Inventory Sync</h5>
                    <p className="text-sm text-gray-600">Automatically update stock levels across platforms</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">Price Synchronization</h5>
                    <p className="text-sm text-gray-600">Keep prices consistent across all platforms</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">Order Notifications</h5>
                    <p className="text-sm text-gray-600">Get instant alerts for new orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">Auto Product Listing</h5>
                    <p className="text-sm text-gray-600">Automatically list new products on connected platforms</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">API Configuration</CardTitle>
                <CardDescription>Manage your platform API keys and connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amazonApi">Amazon MWS API Key</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="amazonApi"
                      type="password"
                      placeholder="Enter API key"
                      defaultValue="••••••••••••••••"
                    />
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="flipkartApi">Flipkart Seller API Key</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="flipkartApi"
                      type="password"
                      placeholder="Enter API key"
                      defaultValue="••••••••••••••••"
                    />
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="syncFrequency">Sync Frequency</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Every hour</option>
                    <option>Every 6 hours</option>
                  </select>
                </div>
                <Button className="w-full">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Webhook Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Webhook Configuration</CardTitle>
              <CardDescription>Set up real-time data synchronization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-2">Order Webhooks</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Receive instant notifications when orders are placed, updated, or cancelled.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-2">Inventory Webhooks</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Get notified when inventory levels change or products go out of stock.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-2">Payment Webhooks</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Track payment status updates and settlement notifications.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Inactive</Badge>
                    <Button variant="outline" size="sm">Setup</Button>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-2">Return Webhooks</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Monitor return requests and refund processing status.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Inactive</Badge>
                    <Button variant="outline" size="sm">Setup</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
