'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, RadialBarChart, RadialBar, Legend } from 'recharts'
import { BarChart3, PieChartIcon, TrendingUp, Download, Share, Filter, Calendar, Eye, Zap, Target, Users, Package, IndianRupee, ShoppingCart, Clock, AlertTriangle } from 'lucide-react'

interface VisualReportsDashboardProps {
  businessType: string
}

export function VisualReportsDashboard({ businessType }: VisualReportsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedChart, setSelectedChart] = useState('revenue')
  const [reportType, setReportType] = useState('executive')

  // Sample data for various charts
  const revenueData = [
    { month: 'Jan', revenue: 85000, profit: 25500, expenses: 59500 },
    { month: 'Feb', revenue: 92000, profit: 28000, expenses: 64000 },
    { month: 'Mar', revenue: 88000, profit: 26400, expenses: 61600 },
    { month: 'Apr', revenue: 105000, profit: 32000, expenses: 73000 },
    { month: 'May', revenue: 118000, profit: 38000, expenses: 80000 },
    { month: 'Jun', revenue: 125000, profit: 40000, expenses: 85000 }
  ]

  const salesTrendData = [
    { date: '01', sales: 4200, orders: 12, customers: 8 },
    { date: '02', sales: 3800, orders: 10, customers: 7 },
    { date: '03', sales: 5200, orders: 15, customers: 12 },
    { date: '04', sales: 4800, orders: 13, customers: 10 },
    { date: '05', sales: 6200, orders: 18, customers: 14 },
    { date: '06', sales: 5800, orders: 16, customers: 13 },
    { date: '07', sales: 7200, orders: 22, customers: 18 }
  ]

  const productPerformanceData = [
    { name: 'Basmati Rice', sales: 45000, margin: 25, units: 380, color: '#8884d8' },
    { name: 'Cooking Oil', sales: 32000, margin: 18, units: 210, color: '#82ca9d' },
    { name: 'Toor Dal', sales: 28000, margin: 22, units: 190, color: '#ffc658' },
    { name: 'Wheat Flour', sales: 18000, margin: 15, units: 120, color: '#ff7300' },
    { name: 'Sugar', sales: 12000, margin: 12, units: 95, color: '#00ff00' },
    { name: 'Tea Powder', sales: 8500, margin: 28, units: 65, color: '#ff0000' }
  ]

  const customerSegmentData = [
    { segment: 'VIP', count: 15, revenue: 85000, color: '#8b5cf6' },
    { segment: 'Regular', count: 45, revenue: 120000, color: '#3b82f6' },
    { segment: 'New', count: 25, revenue: 35000, color: '#10b981' },
    { segment: 'At-Risk', count: 12, revenue: 8000, color: '#ef4444' }
  ]

  const inventoryStatusData = [
    { category: 'Grains', inStock: 85, lowStock: 12, outOfStock: 3, value: 450000 },
    { category: 'Pulses', inStock: 42, lowStock: 8, outOfStock: 2, value: 280000 },
    { category: 'Oils', inStock: 28, lowStock: 5, outOfStock: 1, value: 180000 },
    { category: 'Spices', inStock: 65, lowStock: 15, outOfStock: 5, value: 120000 },
    { category: 'Others', inStock: 38, lowStock: 7, outOfStock: 2, value: 95000 }
  ]

  const cashFlowData = [
    { month: 'Jan', inflow: 95000, outflow: 72000, net: 23000 },
    { month: 'Feb', inflow: 102000, outflow: 78000, net: 24000 },
    { month: 'Mar', inflow: 98000, outflow: 75000, net: 23000 },
    { month: 'Apr', inflow: 115000, outflow: 85000, net: 30000 },
    { month: 'May', inflow: 128000, outflow: 92000, net: 36000 },
    { month: 'Jun', inflow: 135000, outflow: 95000, net: 40000 }
  ]

  const performanceKPIs = [
    { name: 'Revenue Growth', value: 15.2, target: 12, unit: '%', status: 'above' },
    { name: 'Profit Margin', value: 32, target: 25, unit: '%', status: 'above' },
    { name: 'Customer Retention', value: 68, target: 70, unit: '%', status: 'below' },
    { name: 'Inventory Turnover', value: 2.3, target: 2.0, unit: 'x', status: 'above' },
    { name: 'Order Fulfillment', value: 95, target: 90, unit: '%', status: 'above' },
    { name: 'Customer Satisfaction', value: 4.2, target: 4.0, unit: '/5', status: 'above' }
  ]

  const getKPIColor = (status: string) => {
    switch (status) {
      case 'above': return 'text-green-600'
      case 'below': return 'text-red-600'
      case 'meeting': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getKPIIcon = (status: string) => {
    switch (status) {
      case 'above': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'below': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'meeting': return <Target className="w-4 h-4 text-blue-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
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
                <BarChart3 className="w-6 h-6 mr-2" />
                Visual Reports & Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Comprehensive visual insights for your {businessType}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 3 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
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

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {performanceKPIs.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{kpi.name}</span>
                {getKPIIcon(kpi.status)}
              </div>
              <div className="flex items-baseline space-x-1">
                <span className={`text-2xl font-bold ${getKPIColor(kpi.status)}`}>
                  {kpi.value}
                </span>
                <span className="text-sm text-gray-500">{kpi.unit}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Target: {kpi.target}{kpi.unit}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="executive">Executive</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue & Profit Trend</CardTitle>
                <CardDescription>Monthly financial performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Sales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Sales Performance</CardTitle>
                <CardDescription>Last 7 days sales and order trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Product Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Product Performance</CardTitle>
              <CardDescription>Sales and margin analysis by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3b82f6" />
                  <Bar dataKey="margin" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly financial breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    <Bar dataKey="profit" fill="#10b981" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cash Flow */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cash Flow Analysis</CardTitle>
                <CardDescription>Monthly cash inflow and outflow</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                    <Area type="monotone" dataKey="inflow" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="outflow" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="net" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₹1,25,000</p>
                    <p className="text-xs text-green-600">+15.2% vs last month</p>
                  </div>
                  <IndianRupee className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gross Profit</p>
                    <p className="text-2xl font-bold text-blue-600">₹40,000</p>
                    <p className="text-xs text-blue-600">32% margin</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Operating Expenses</p>
                    <p className="text-2xl font-bold text-red-600">₹85,000</p>
                    <p className="text-xs text-red-600">68% of revenue</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Cash Flow</p>
                    <p className="text-2xl font-bold text-purple-600">₹40,000</p>
                    <p className="text-xs text-purple-600">Positive flow</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Sales Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Sales Distribution</CardTitle>
                <CardDescription>Revenue contribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={productPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="sales"
                    >
                      {productPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Product Margin Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Margin Analysis</CardTitle>
                <CardDescription>Profitability by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={productPerformanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="margin" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Product Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Product Performance</CardTitle>
              <CardDescription>Comprehensive product metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {productPerformanceData.map((product, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{product.name}</h4>
                      <Badge variant="outline">
                        {product.margin}% margin
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Revenue:</span>
                        <p className="font-medium text-green-600">₹{product.sales.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Units Sold:</span>
                        <p className="font-medium">{product.units}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Avg Price:</span>
                        <p className="font-medium">₹{Math.round(product.sales / product.units)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segmentation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Segmentation</CardTitle>
                <CardDescription>Customer distribution by value segments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Revenue */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue by Customer Segment</CardTitle>
                <CardDescription>Revenue contribution from each customer segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={customerSegmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Customer Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-blue-600">97</p>
                    <p className="text-xs text-blue-600">Active customers</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New Customers</p>
                    <p className="text-2xl font-bold text-green-600">25</p>
                    <p className="text-xs text-green-600">This month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Customer LTV</p>
                    <p className="text-2xl font-bold text-purple-600">₹2,580</p>
                    <p className="text-xs text-purple-600">Average lifetime value</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Retention Rate</p>
                    <p className="text-2xl font-bold text-orange-600">68%</p>
                    <p className="text-xs text-orange-600">Monthly retention</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inventory Status by Category</CardTitle>
                <CardDescription>Stock levels across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={inventoryStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inStock" stackId="a" fill="#10b981" name="In Stock" />
                    <Bar dataKey="lowStock" stackId="a" fill="#f59e0b" name="Low Stock" />
                    <Bar dataKey="outOfStock" stackId="a" fill="#ef4444" name="Out of Stock" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Inventory Value */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inventory Value Distribution</CardTitle>
                <CardDescription>Value of inventory by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={inventoryStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Value']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory Alerts & Actions</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-red-900">Critical Stock Alert</span>
                  </div>
                  <p className="text-sm text-red-700">3 items are out of stock and need immediate restocking</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-yellow-900">Low Stock Warning</span>
                  </div>
                  <p className="text-sm text-yellow-700">47 items are below reorder point</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-900">Optimal Stock</span>
                  </div>
                  <p className="text-sm text-green-700">258 items are at optimal stock levels</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="executive" className="space-y-4">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Executive Summary Dashboard</CardTitle>
              <CardDescription>High-level business performance overview for leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📊 Business Health</h4>
                  <p className="text-3xl font-bold text-blue-800">Excellent</p>
                  <p className="text-sm text-blue-600">All KPIs above target</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">💰 Revenue Growth</h4>
                  <p className="text-3xl font-bold text-green-800">+15.2%</p>
                  <p className="text-sm text-green-600">Month over month</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🎯 Profit Margin</h4>
                  <p className="text-3xl font-bold text-purple-800">32%</p>
                  <p className="text-sm text-purple-600">Above industry avg</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">📈 Market Position</h4>
                  <p className="text-3xl font-bold text-orange-800">Strong</p>
                  <p className="text-sm text-orange-600">Growing market share</p>
                </div>
              </div>

              {/* Executive Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64">
                  <h4 className="font-medium mb-4">Revenue vs Target</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-64">
                  <h4 className="font-medium mb-4">Key Performance Indicators</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={[
                      { name: 'Revenue', value: 85, fill: '#3b82f6' },
                      { name: 'Profit', value: 92, fill: '#10b981' },
                      { name: 'Customer', value: 78, fill: '#f59e0b' },
                      { name: 'Growth', value: 88, fill: '#8b5cf6' }
                    ]}>
                      <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Strategic Insights & Recommendations</CardTitle>
              <CardDescription>AI-powered business intelligence for strategic decision making</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">🎯 Key Opportunities</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-900">Market Expansion</h5>
                      <p className="text-sm text-blue-700">Consider expanding to online marketplaces. Potential 25% revenue increase.</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-900">Product Bundling</h5>
                      <p className="text-sm text-green-700">Rice + Dal bundles show 85% co-purchase rate. Implement combo offers.</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h5 className="font-medium text-purple-900">Customer Loyalty</h5>
                      <p className="text-sm text-purple-700">Launch loyalty program to increase retention from 68% to 80%.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">⚠️ Risk Factors</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-900">Inventory Risk</h5>
                      <p className="text-sm text-yellow-700">47 items below reorder point. Implement automated reordering.</p>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h5 className="font-medium text-red-900">Competition</h5>
                      <p className="text-sm text-red-700">2 new competitors in area. Monitor pricing and differentiate offerings.</p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <h5 className="font-medium text-orange-900">Seasonal Demand</h5>
                      <p className="text-sm text-orange-700">Festival season approaching. Increase inventory by 30%.</p>
                    </div>
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
