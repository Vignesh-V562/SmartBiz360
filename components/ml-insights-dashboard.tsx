'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts'
import { Brain, TrendingUp, Users, Package, DollarSign, AlertTriangle, Target, Zap, RefreshCw, Download, Share, Eye, Lightbulb } from 'lucide-react'
import { MLEngine, DemandForecast, CustomerInsights, PriceOptimization, InventoryOptimization, ChurnPrediction, SalesForecast } from '@/lib/ml-engine'

interface MLInsightsDashboardProps {
  businessType: string
}

export function MLInsightsDashboard({ businessType }: MLInsightsDashboardProps) {
  const [mlEngine] = useState(() => new MLEngine())
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  
  // ML Insights State
  const [demandForecast, setDemandForecast] = useState<DemandForecast | null>(null)
  const [customerInsights, setCustomerInsights] = useState<CustomerInsights | null>(null)
  const [priceOptimization, setPriceOptimization] = useState<PriceOptimization | null>(null)
  const [inventoryOptimization, setInventoryOptimization] = useState<InventoryOptimization | null>(null)
  const [churnPrediction, setChurnPrediction] = useState<ChurnPrediction | null>(null)
  const [salesForecast, setSalesForecast] = useState<SalesForecast | null>(null)

  useEffect(() => {
    loadMLInsights()
  }, [])

  const loadMLInsights = async () => {
    setIsLoading(true)
    try {
      // Train models with mock business data
      await mlEngine.trainModels({
        sales: generateMockSalesData(),
        inventory: generateMockInventoryData(),
        customers: generateMockCustomerData(),
        transactions: generateMockTransactionData()
      })

      // Get predictions
      const [demand, customer, price, inventory, churn, sales] = await Promise.all([
        mlEngine.getDemandForecast('rice-1kg', 30),
        mlEngine.getCustomerInsights(),
        mlEngine.getPriceOptimization('rice-1kg'),
        mlEngine.getInventoryOptimization(),
        mlEngine.getChurnPrediction(),
        mlEngine.getSalesForecast('daily')
      ])

      setDemandForecast(demand)
      setCustomerInsights(customer)
      setPriceOptimization(price)
      setInventoryOptimization(inventory)
      setChurnPrediction(churn)
      setSalesForecast(sales)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error loading ML insights:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshInsights = () => {
    loadMLInsights()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-600" />
                AI-Powered Business Intelligence
              </CardTitle>
              <CardDescription>
                Advanced machine learning insights for your {businessType}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshInsights}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* ML Insights Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Model Accuracy</p>
                <p className="text-2xl font-bold text-green-600">87%</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Predictions Made</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
              </div>
              <Brain className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-purple-600">₹27,000</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue Impact</p>
                <p className="text-2xl font-bold text-orange-600">+15.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main ML Insights */}
      <Tabs defaultValue="demand" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
          <TabsTrigger value="customers">Customer AI</TabsTrigger>
          <TabsTrigger value="pricing">Price Optimization</TabsTrigger>
          <TabsTrigger value="inventory">Smart Inventory</TabsTrigger>
          <TabsTrigger value="churn">Churn Prevention</TabsTrigger>
          <TabsTrigger value="sales">Sales Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="demand" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Demand Forecasting
              </CardTitle>
              <CardDescription>AI-powered demand predictions for the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {demandForecast && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">📈 Peak Demand</h4>
                      <p className="text-2xl font-bold text-blue-800">
                        {Math.max(...demandForecast.forecast.map(f => f.predictedDemand))} units
                      </p>
                      <p className="text-sm text-blue-600">Expected on festival days</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">🎯 Accuracy</h4>
                      <p className="text-2xl font-bold text-green-800">{Math.round(demandForecast.accuracy * 100)}%</p>
                      <p className="text-sm text-green-600">Model confidence</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">📊 Trend</h4>
                      <p className="text-2xl font-bold text-purple-800">+{Math.round((demandForecast.factors.trend - 1) * 100)}%</p>
                      <p className="text-sm text-purple-600">Growth expected</p>
                    </div>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={demandForecast.forecast.slice(0, 14)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="predictedDemand" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Key Factors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Seasonal Impact</span>
                            <Badge variant="outline">+{Math.round((demandForecast.factors.seasonal - 1) * 100)}%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Growth Trend</span>
                            <Badge variant="outline">+{Math.round((demandForecast.factors.trend - 1) * 100)}%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>External Factors</span>
                            <Badge variant="outline">+{Math.round((demandForecast.factors.external - 1) * 100)}%</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">AI Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <p className="text-sm">Increase inventory by 30% for festival season</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <p className="text-sm">Plan promotional campaigns for low-demand days</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <p className="text-sm">Consider bulk purchasing discounts</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Customer Intelligence
              </CardTitle>
              <CardDescription>AI-driven customer segmentation and behavior analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {customerInsights && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {customerInsights.segments.map((segment, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{segment.name}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Size:</span>
                              <span className="font-medium">{segment.size} customers</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Avg Spending:</span>
                              <span className="font-medium">₹{segment.averageSpending}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Retention:</span>
                              <span className="font-medium">{Math.round(segment.retentionRate * 100)}%</span>
                            </div>
                          </div>
                          <Progress value={segment.retentionRate * 100} className="mt-3" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Customer Segments Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie
                              data={customerInsights.segments}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, size }) => `${name}: ${size}`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="size"
                            >
                              {customerInsights.segments.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Next Best Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {customerInsights.nextBestActions.map((action, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <h5 className="font-medium text-sm">{action.action}</h5>
                              <div className="flex space-x-2 mt-2">
                                <Badge variant={action.impact === 'High' ? 'default' : 'secondary'} className="text-xs">
                                  {action.impact} Impact
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {action.effort} Effort
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {customerInsights.personalizedRecommendations.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Personalized Product Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {customerInsights.personalizedRecommendations.map((rec, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <h5 className="font-medium">{rec.product}</h5>
                              <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                              <Badge variant="outline" className="mt-2 text-xs">
                                {Math.round(rec.confidence * 100)}% confidence
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Price Optimization
              </CardTitle>
              <CardDescription>AI-powered pricing recommendations for maximum profitability</CardDescription>
            </CardHeader>
            <CardContent>
              {priceOptimization && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">💰 Current Price</h4>
                      <p className="text-2xl font-bold text-blue-800">₹{priceOptimization.currentPrice}</p>
                      <p className="text-sm text-blue-600">Basmati Rice 1kg</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">🎯 Optimal Price</h4>
                      <p className="text-2xl font-bold text-green-800">₹{priceOptimization.recommendedPrice}</p>
                      <p className="text-sm text-green-600">AI recommended</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">📈 Profit Impact</h4>
                      <p className="text-2xl font-bold text-purple-800">
                        {priceOptimization.expectedImpact.profitChange > 0 ? '+' : ''}
                        {Math.round(priceOptimization.expectedImpact.profitChange * 100)}%
                      </p>
                      <p className="text-sm text-purple-600">Expected change</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Expected Impact Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Demand Change</span>
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${priceOptimization.expectedImpact.demandChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {priceOptimization.expectedImpact.demandChange >= 0 ? '+' : ''}
                                {Math.round(priceOptimization.expectedImpact.demandChange * 100)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Revenue Change</span>
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${priceOptimization.expectedImpact.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {priceOptimization.expectedImpact.revenueChange >= 0 ? '+' : ''}
                                {Math.round(priceOptimization.expectedImpact.revenueChange * 100)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Profit Change</span>
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${priceOptimization.expectedImpact.profitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {priceOptimization.expectedImpact.profitChange >= 0 ? '+' : ''}
                                {Math.round(priceOptimization.expectedImpact.profitChange * 100)}%
                              </span>
                            </div>
                          </div>
                          <div className="pt-2 border-t">
                            <div className="flex justify-between items-center">
                              <span>Confidence Level</span>
                              <Badge variant="outline">
                                {Math.round(priceOptimization.confidence * 100)}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Implementation Strategy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {priceOptimization.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                              <p className="text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-4">
                          Apply Recommended Price
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Smart Inventory Optimization
              </CardTitle>
              <CardDescription>AI-driven inventory management and optimization</CardDescription>
            </CardHeader>
            <CardContent>
              {inventoryOptimization && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">💰 Potential Savings</h4>
                      <p className="text-2xl font-bold text-green-800">₹{inventoryOptimization.totalOptimization.savings.toLocaleString()}</p>
                      <p className="text-sm text-green-600">Through optimization</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">📊 Turnover Improvement</h4>
                      <p className="text-2xl font-bold text-blue-800">+{Math.round(inventoryOptimization.totalOptimization.turnoverImprovement * 100)}%</p>
                      <p className="text-sm text-blue-600">Inventory efficiency</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">⚡ Actions Required</h4>
                      <p className="text-2xl font-bold text-purple-800">{inventoryOptimization.recommendations.length}</p>
                      <p className="text-sm text-purple-600">Optimization tasks</p>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Inventory Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {inventoryOptimization.recommendations.map((rec, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-medium">{rec.productName}</h5>
                                <p className="text-sm text-gray-600">{rec.reason}</p>
                              </div>
                              <Badge 
                                variant={rec.urgency === 'critical' ? 'destructive' : 
                                        rec.urgency === 'high' ? 'default' : 'secondary'}
                              >
                                {rec.urgency}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Current Stock:</span>
                                <p className="font-medium">{rec.currentStock} units</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Recommended:</span>
                                <p className="font-medium">{rec.recommendedStock} units</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Reorder Point:</span>
                                <p className="font-medium">{rec.reorderPoint} units</p>
                              </div>
                              <div>
                                <span className="text-gray-500">EOQ:</span>
                                <p className="font-medium">{rec.economicOrderQuantity} units</p>
                              </div>
                            </div>

                            {rec.expectedStockout && (
                              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                                <div className="flex items-center space-x-2">
                                  <AlertTriangle className="w-4 h-4 text-red-500" />
                                  <span className="text-sm text-red-700">
                                    Expected stockout: {rec.expectedStockout}
                                  </span>
                                </div>
                              </div>
                            )}

                            <Button 
                              size="sm" 
                              className="mt-3"
                              variant={rec.urgency === 'critical' ? 'destructive' : 'default'}
                            >
                              {rec.action === 'urgent_reorder' ? 'Urgent Reorder' :
                               rec.action === 'increase' ? 'Increase Stock' :
                               rec.action === 'reduce' ? 'Reduce Stock' : 'Take Action'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {inventoryOptimization.insights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <p className="text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Customer Churn Prevention
              </CardTitle>
              <CardDescription>AI-powered customer retention and churn prediction</CardDescription>
            </CardHeader>
            <CardContent>
              {churnPrediction && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-2">⚠️ Overall Churn Rate</h4>
                      <p className="text-2xl font-bold text-red-800">{Math.round(churnPrediction.overallChurnRate * 100)}%</p>
                      <p className="text-sm text-red-600">Monthly average</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-2">🚨 High Risk Customers</h4>
                      <p className="text-2xl font-bold text-orange-800">{churnPrediction.highRiskCustomers.length}</p>
                      <p className="text-sm text-orange-600">Need immediate attention</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">💚 Retention Success</h4>
                      <p className="text-2xl font-bold text-green-800">65%</p>
                      <p className="text-sm text-green-600">With AI interventions</p>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">High-Risk Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {churnPrediction.highRiskCustomers.map((customer, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-medium">{customer.customerName}</h5>
                                <p className="text-sm text-gray-600">
                                  Last purchase: {customer.lastPurchase} • Total spent: ₹{customer.totalSpent.toLocaleString()}
                                </p>
                              </div>
                              <Badge variant="destructive">
                                {Math.round(customer.churnProbability * 100)}% risk
                              </Badge>
                            </div>
                            
                            <div className="mb-3">
                              <h6 className="text-sm font-medium mb-2">Risk Factors:</h6>
                              <div className="flex flex-wrap gap-2">
                                {customer.riskFactors.map((factor, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {factor}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="mb-3">
                              <h6 className="text-sm font-medium mb-2">AI Recommendations:</h6>
                              <div className="space-y-1">
                                {customer.recommendations.map((rec, idx) => (
                                  <div key={idx} className="flex items-start space-x-2">
                                    <Zap className="w-3 h-3 text-yellow-500 mt-0.5" />
                                    <p className="text-xs">{rec}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button size="sm" variant="destructive">
                                Send Win-back Offer
                              </Button>
                              <Button size="sm" variant="outline">
                                Schedule Call
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Retention Strategies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {churnPrediction.retentionStrategies.map((strategy, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium">{strategy.strategy}</h5>
                              <Badge variant="outline">ROI: {strategy.roi}x</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{strategy.targetSegment}</p>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Expected Retention:</span>
                                <p className="font-medium">{Math.round(strategy.expectedRetention * 100)}%</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Investment:</span>
                                <p className="font-medium">₹{strategy.cost.toLocaleString()}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">ROI:</span>
                                <p className="font-medium text-green-600">{strategy.roi}x</p>
                              </div>
                            </div>
                            
                            <Button size="sm" className="mt-3">
                              Implement Strategy
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Sales Forecasting
              </CardTitle>
              <CardDescription>AI-powered sales predictions and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {salesForecast && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">📈 Forecast Accuracy</h4>
                      <p className="text-2xl font-bold text-blue-800">{Math.round(salesForecast.accuracy * 100)}%</p>
                      <p className="text-sm text-blue-600">Model precision</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">📊 Trend</h4>
                      <p className="text-2xl font-bold text-green-800">
                        {salesForecast.trends.overall === 'increasing' ? '↗️' : '↘️'} 
                        {salesForecast.trends.overall === 'increasing' ? '+15%' : '-5%'}
                      </p>
                      <p className="text-sm text-green-600">Next month</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">🎯 Confidence</h4>
                      <p className="text-2xl font-bold text-purple-800">{Math.round(salesForecast.confidence * 100)}%</p>
                      <p className="text-sm text-purple-600">Prediction confidence</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-2">⭐ Peak Day</h4>
                      <p className="text-2xl font-bold text-orange-800">Weekend</p>
                      <p className="text-sm text-orange-600">+40% sales</p>
                    </div>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesForecast.forecast.slice(0, 14)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="predictedSales" 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">AI Insights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {salesForecast.insights.map((insight, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                              <p className="text-sm">{insight}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Strategic Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {salesForecast.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                              <p className="text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Trend Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Overall Trend</h5>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm capitalize">{salesForecast.trends.overall}</span>
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Seasonal Pattern</h5>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">{salesForecast.trends.seasonal.replace('_', ' ')}</span>
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h5 className="font-medium mb-2">Weekly Pattern</h5>
                          <div className="flex items-center space-x-2">
                            <BarChart className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">{salesForecast.trends.weekly.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  // Helper functions to generate mock data
  function generateMockSalesData() {
    const data = []
    for (let i = 0; i < 90; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toISOString(),
        amount: Math.random() * 1000 + 500,
        productId: ['rice-1kg', 'dal-1kg', 'oil-1l'][Math.floor(Math.random() * 3)],
        customerId: `cust_${Math.floor(Math.random() * 100)}`
      })
    }
    return data
  }

  function generateMockInventoryData() {
    return [
      { productId: 'rice-1kg', currentStock: 45, minStock: 20, maxStock: 100 },
      { productId: 'dal-1kg', currentStock: 8, minStock: 15, maxStock: 50 },
      { productId: 'oil-1l', currentStock: 25, minStock: 10, maxStock: 60 }
    ]
  }

  function generateMockCustomerData() {
    return [
      { id: 'cust_001', name: 'Rajesh Kumar', registrationDate: '2023-01-15' },
      { id: 'cust_002', name: 'Priya Sharma', registrationDate: '2023-03-20' },
      { id: 'cust_003', name: 'Amit Singh', registrationDate: '2022-11-10' }
    ]
  }

  function generateMockTransactionData() {
    const data = []
    for (let i = 0; i < 200; i++) {
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 180))
      data.push({
        id: `txn_${i}`,
        customerId: `cust_${Math.floor(Math.random() * 100)}`,
        amount: Math.random() * 500 + 100,
        date: date.toISOString(),
        productId: ['rice-1kg', 'dal-1kg', 'oil-1l'][Math.floor(Math.random() * 3)]
      })
    }
    return data
  }
}
