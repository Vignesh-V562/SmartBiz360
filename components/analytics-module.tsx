'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, TrendingDown, Users, Package, IndianRupee, Calendar, Download, Share, Filter, Eye, Brain, Zap } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts'
import { MLInsightsDashboard } from '@/components/ml-insights-dashboard'

interface AnalyticsModuleProps {
  businessType: string
}

export function AnalyticsModule({ businessType }: AnalyticsModuleProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [showMLInsights, setShowMLInsights] = useState(false)

  const salesData = [
    { name: 'Mon', sales: 4000, profit: 1200, orders: 12 },
    { name: 'Tue', sales: 3000, profit: 900, orders: 8 },
    { name: 'Wed', sales: 5000, profit: 1500, orders: 15 },
    { name: 'Thu', sales: 4500, profit: 1350, orders: 13 },
    { name: 'Fri', sales: 6000, profit: 1800, orders: 18 },
    { name: 'Sat', sales: 8000, profit: 2400, orders: 25 },
    { name: 'Sun', sales: 7000, profit: 2100, orders: 22 }
  ]

  const productData = [
    { name: 'Basmati Rice', value: 35, sales: 45000, color: '#8884d8' },
    { name: 'Cooking Oil', value: 25, sales: 32000, color: '#82ca9d' },
    { name: 'Toor Dal', value: 20, sales: 28000, color: '#ffc658' },
    { name: 'Wheat Flour', value: 12, sales: 18000, color: '#ff7300' },
    { name: 'Others', value: 8, sales: 12000, color: '#00ff00' }
  ]

  const customerData = [
    { segment: 'VIP', count: 15, revenue: 85000, color: '#8b5cf6' },
    { segment: 'Regular', count: 45, revenue: 120000, color: '#3b82f6' },
    { segment: 'New', count: 25, revenue: 35000, color: '#10b981' },
    { segment: 'Inactive', count: 12, revenue: 8000, color: '#ef4444' }
  ]

  const monthlyTrends = [
    { month: 'Jan', revenue: 85000, customers: 120, orders: 450 },
    { month: 'Feb', revenue: 92000, customers: 135, orders: 480 },
    { month: 'Mar', revenue: 88000, customers: 128, orders: 465 },
    { month: 'Apr', revenue: 105000, customers: 150, orders: 520 },
    { month: 'May', revenue: 118000, customers: 165, orders: 580 },
    { month: 'Jun', revenue: 125000, customers: 175, orders: 620 }
  ]

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '₹1,25,000',
      change: '+15.2%',
      trend: 'up',
      icon: IndianRupee,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '620',
      change: '+8.5%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Active Customers',
      value: '175',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Avg Order Value',
      value: '₹201',
      change: '-2.1%',
      trend: 'down',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ]

  const topProducts = [
    { name: 'Basmati Rice 1kg', sold: 145, revenue: 17400, growth: '+12%' },
    { name: 'Cooking Oil 1L', sold: 98, revenue: 17640, growth: '+8%' },
    { name: 'Toor Dal 1kg', sold: 87, revenue: 13050, growth: '+15%' },
    { name: 'Wheat Flour 5kg', sold: 76, revenue: 11400, growth: '+5%' },
    { name: 'Sugar 1kg', sold: 65, revenue: 2925, growth: '-3%' }
  ]

  const topCustomers = [
    { name: 'Rajesh Kumar', orders: 25, spent: 15600, lastVisit: '2 days ago' },
    { name: 'Amit Singh', orders: 22, spent: 13200, lastVisit: '1 day ago' },
    { name: 'Priya Sharma', orders: 18, spent: 10800, lastVisit: '3 days ago' },
    { name: 'Suresh Patel', orders: 15, spent: 9500, lastVisit: '1 week ago' },
    { name: 'Meera Joshi', orders: 12, spent: 7200, lastVisit: '4 days ago' }
  ]

  if (showMLInsights) {
    return <MLInsightsDashboard businessType={businessType} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Business Analytics
              </CardTitle>
              <CardDescription>AI-powered insights for your {businessType}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowMLInsights(true)}
                className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200"
              >
                <Brain className="w-4 h-4 mr-2 text-purple-600" />
                AI Insights
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Insights Teaser */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Unlock AI-Powered Insights</h3>
                <p className="text-gray-600">Get advanced predictions, customer segmentation, and optimization recommendations</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowMLInsights(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Explore AI Features
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Period Selector */}
      <div className="flex space-x-2">
        {['7d', '30d', '90d', '1y'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
          >
            {period === '7d' ? 'Last 7 Days' :
             period === '30d' ? 'Last 30 Days' :
             period === '90d' ? 'Last 3 Months' : 'Last Year'}
          </Button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales Trends</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          <TabsTrigger value="forecasting">Basic Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Sales & Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Orders Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Sales Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.sold} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{product.revenue.toLocaleString()}</p>
                        <Badge variant={product.growth.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                          {product.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerData.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        ></div>
                        <div>
                          <h4 className="font-medium">{segment.segment}</h4>
                          <p className="text-sm text-gray-500">{segment.count} customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{segment.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          ₹{Math.round(segment.revenue / segment.count).toLocaleString()} avg
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{customer.name}</h4>
                        <p className="text-sm text-gray-500">
                          {customer.orders} orders • Last visit: {customer.lastVisit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">₹{customer.spent.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          ₹{Math.round(customer.spent / customer.orders)} avg
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Basic Business Forecasting</CardTitle>
                  <CardDescription>Simple trend-based predictions</CardDescription>
                </div>
                <Button 
                  onClick={() => setShowMLInsights(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Upgrade to AI Forecasting
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📈 Sales Forecast</h4>
                  <p className="text-2xl font-bold text-blue-800">₹1,35,000</p>
                  <p className="text-sm text-blue-600">Expected next month (+8%)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Order Prediction</h4>
                  <p className="text-2xl font-bold text-green-800">680</p>
                  <p className="text-sm text-green-600">Projected orders</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">👥 Customer Growth</h4>
                  <p className="text-2xl font-bold text-purple-800">+15</p>
                  <p className="text-sm text-purple-600">New customers expected</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-lg">Unlock Advanced AI Forecasting</h4>
                    <p className="text-gray-600">Get precise demand forecasting, customer behavior prediction, and inventory optimization</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">87% accuracy demand forecasting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Customer churn prediction</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Price optimization recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Smart inventory management</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowMLInsights(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Explore AI Features Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
