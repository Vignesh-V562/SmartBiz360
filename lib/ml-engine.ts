'use client'

// Machine Learning Engine for SmartBiz360
export class MLEngine {
  private models: Map<string, any> = new Map()
  private trainingData: Map<string, any[]> = new Map()

  constructor() {
    this.initializeModels()
  }

  private initializeModels() {
    // Initialize different ML models
    this.models.set('demand_forecasting', new DemandForecastingModel())
    this.models.set('customer_segmentation', new CustomerSegmentationModel())
    this.models.set('price_optimization', new PriceOptimizationModel())
    this.models.set('inventory_optimization', new InventoryOptimizationModel())
    this.models.set('churn_prediction', new ChurnPredictionModel())
    this.models.set('sales_forecasting', new SalesForecastingModel())
  }

  // Train models with business data
  async trainModels(businessData: any) {
    const { sales, inventory, customers, transactions } = businessData

    // Train demand forecasting
    await this.models.get('demand_forecasting')?.train({
      salesHistory: sales,
      seasonality: this.extractSeasonality(sales),
      externalFactors: this.getExternalFactors()
    })

    // Train customer segmentation
    await this.models.get('customer_segmentation')?.train({
      customerData: customers,
      transactionHistory: transactions,
      behaviorMetrics: this.calculateCustomerMetrics(customers, transactions)
    })

    // Train other models
    await this.trainPriceOptimization(sales, inventory)
    await this.trainInventoryOptimization(inventory, sales)
    await this.trainChurnPrediction(customers, transactions)
  }

  // Get demand forecast for products
  async getDemandForecast(productId: string, days: number = 30): Promise<DemandForecast> {
    const model = this.models.get('demand_forecasting')
    return await model.predict({
      productId,
      forecastDays: days,
      currentDate: new Date(),
      historicalData: this.getProductHistory(productId)
    })
  }

  // Get customer segments and insights
  async getCustomerInsights(customerId?: string): Promise<CustomerInsights> {
    const model = this.models.get('customer_segmentation')
    return await model.analyze({
      customerId,
      includeSegmentation: true,
      includePredictions: true
    })
  }

  // Get optimal pricing recommendations
  async getPriceOptimization(productId: string): Promise<PriceOptimization> {
    const model = this.models.get('price_optimization')
    return await model.optimize({
      productId,
      marketConditions: await this.getMarketConditions(),
      competitorPrices: await this.getCompetitorPrices(productId),
      demandElasticity: await this.calculateDemandElasticity(productId)
    })
  }

  // Get inventory optimization recommendations
  async getInventoryOptimization(): Promise<InventoryOptimization> {
    const model = this.models.get('inventory_optimization')
    return await model.optimize({
      currentInventory: await this.getCurrentInventory(),
      demandForecast: await this.getAllDemandForecasts(),
      supplierData: await this.getSupplierData(),
      storageConstraints: await this.getStorageConstraints()
    })
  }

  // Predict customer churn
  async getChurnPrediction(): Promise<ChurnPrediction> {
    const model = this.models.get('churn_prediction')
    return await model.predict({
      customers: await this.getCustomerData(),
      recentActivity: await this.getRecentActivity(),
      engagementMetrics: await this.getEngagementMetrics()
    })
  }

  // Get sales forecast
  async getSalesForecast(period: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<SalesForecast> {
    const model = this.models.get('sales_forecasting')
    return await model.forecast({
      period,
      historicalSales: await this.getSalesHistory(),
      seasonalFactors: await this.getSeasonalFactors(),
      marketTrends: await this.getMarketTrends()
    })
  }

  // Helper methods
  private extractSeasonality(sales: any[]): SeasonalityData {
    // Extract seasonal patterns from sales data
    const monthlyPatterns = new Map()
    const weeklyPatterns = new Map()
    const dailyPatterns = new Map()

    sales.forEach(sale => {
      const date = new Date(sale.date)
      const month = date.getMonth()
      const dayOfWeek = date.getDay()
      const hour = date.getHours()

      // Monthly patterns
      monthlyPatterns.set(month, (monthlyPatterns.get(month) || 0) + sale.amount)
      
      // Weekly patterns
      weeklyPatterns.set(dayOfWeek, (weeklyPatterns.get(dayOfWeek) || 0) + sale.amount)
      
      // Daily patterns
      dailyPatterns.set(hour, (dailyPatterns.get(hour) || 0) + sale.amount)
    })

    return {
      monthly: Array.from(monthlyPatterns.entries()),
      weekly: Array.from(weeklyPatterns.entries()),
      daily: Array.from(dailyPatterns.entries())
    }
  }

  private getExternalFactors(): ExternalFactors {
    return {
      festivals: this.getFestivalCalendar(),
      weather: this.getWeatherData(),
      economicIndicators: this.getEconomicData(),
      marketEvents: this.getMarketEvents()
    }
  }

  private calculateCustomerMetrics(customers: any[], transactions: any[]): CustomerMetrics[] {
    return customers.map(customer => {
      const customerTransactions = transactions.filter(t => t.customerId === customer.id)
      
      return {
        customerId: customer.id,
        totalSpent: customerTransactions.reduce((sum, t) => sum + t.amount, 0),
        frequency: customerTransactions.length,
        recency: this.calculateRecency(customerTransactions),
        averageOrderValue: customerTransactions.reduce((sum, t) => sum + t.amount, 0) / customerTransactions.length,
        lifetimeValue: this.calculateLifetimeValue(customerTransactions),
        churnRisk: this.calculateChurnRisk(customer, customerTransactions)
      }
    })
  }

  private async trainPriceOptimization(sales: any[], inventory: any[]) {
    const model = this.models.get('price_optimization')
    await model.train({
      priceHistory: this.extractPriceHistory(sales),
      demandResponse: this.calculateDemandResponse(sales),
      competitorData: await this.getCompetitorData(),
      costData: this.extractCostData(inventory)
    })
  }

  private async trainInventoryOptimization(inventory: any[], sales: any[]) {
    const model = this.models.get('inventory_optimization')
    await model.train({
      inventoryHistory: inventory,
      salesVelocity: this.calculateSalesVelocity(sales),
      stockoutEvents: this.identifyStockouts(inventory, sales),
      supplierPerformance: await this.getSupplierPerformance()
    })
  }

  private async trainChurnPrediction(customers: any[], transactions: any[]) {
    const model = this.models.get('churn_prediction')
    await model.train({
      customerFeatures: this.extractCustomerFeatures(customers, transactions),
      churnLabels: this.identifyChurnedCustomers(customers, transactions),
      engagementData: this.calculateEngagementScores(customers, transactions)
    })
  }

  // Utility methods for data processing
  private calculateRecency(transactions: any[]): number {
    if (transactions.length === 0) return Infinity
    const lastTransaction = Math.max(...transactions.map(t => new Date(t.date).getTime()))
    return (Date.now() - lastTransaction) / (1000 * 60 * 60 * 24) // days
  }

  private calculateLifetimeValue(transactions: any[]): number {
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0)
    const avgOrderValue = totalSpent / transactions.length
    const frequency = transactions.length
    const lifespan = this.calculateCustomerLifespan(transactions)
    
    return avgOrderValue * frequency * lifespan
  }

  private calculateChurnRisk(customer: any, transactions: any[]): number {
    const recency = this.calculateRecency(transactions)
    const frequency = transactions.length
    const avgDaysBetweenOrders = this.calculateAvgDaysBetweenOrders(transactions)
    
    // Simple churn risk calculation
    if (recency > avgDaysBetweenOrders * 2) return 0.8
    if (recency > avgDaysBetweenOrders * 1.5) return 0.6
    if (frequency < 3) return 0.4
    return 0.2
  }

  private calculateCustomerLifespan(transactions: any[]): number {
    if (transactions.length < 2) return 1
    const dates = transactions.map(t => new Date(t.date).getTime()).sort()
    const lifespan = (dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24)
    return Math.max(lifespan / 365, 1) // years, minimum 1 year
  }

  private calculateAvgDaysBetweenOrders(transactions: any[]): number {
    if (transactions.length < 2) return 30 // default
    const dates = transactions.map(t => new Date(t.date).getTime()).sort()
    const intervals = []
    for (let i = 1; i < dates.length; i++) {
      intervals.push((dates[i] - dates[i-1]) / (1000 * 60 * 60 * 24))
    }
    return intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
  }

  // Mock data methods (in real implementation, these would fetch from APIs)
  private getFestivalCalendar() {
    return [
      { name: 'Diwali', date: '2024-11-01', impact: 'high' },
      { name: 'Holi', date: '2024-03-13', impact: 'medium' },
      { name: 'Eid', date: '2024-04-10', impact: 'medium' }
    ]
  }

  private getWeatherData() {
    return { temperature: 28, humidity: 65, rainfall: 0 }
  }

  private getEconomicData() {
    return { inflation: 4.2, gdpGrowth: 6.8, consumerIndex: 112 }
  }

  private getMarketEvents() {
    return [
      { event: 'harvest_season', impact: 'positive', products: ['rice', 'wheat'] },
      { event: 'monsoon', impact: 'negative', products: ['vegetables'] }
    ]
  }

  // Additional helper methods would be implemented here...
  private getProductHistory(productId: string) { return [] }
  private getMarketConditions() { return Promise.resolve({}) }
  private getCompetitorPrices(productId: string) { return Promise.resolve([]) }
  private calculateDemandElasticity(productId: string) { return Promise.resolve(1.2) }
  private getCurrentInventory() { return Promise.resolve([]) }
  private getAllDemandForecasts() { return Promise.resolve([]) }
  private getSupplierData() { return Promise.resolve([]) }
  private getStorageConstraints() { return Promise.resolve({}) }
  private getCustomerData() { return Promise.resolve([]) }
  private getRecentActivity() { return Promise.resolve([]) }
  private getEngagementMetrics() { return Promise.resolve([]) }
  private getSalesHistory() { return Promise.resolve([]) }
  private getSeasonalFactors() { return Promise.resolve({}) }
  private getMarketTrends() { return Promise.resolve({}) }
  private extractPriceHistory(sales: any[]) { return [] }
  private calculateDemandResponse(sales: any[]) { return [] }
  private getCompetitorData() { return Promise.resolve([]) }
  private extractCostData(inventory: any[]) { return [] }
  private calculateSalesVelocity(sales: any[]) { return [] }
  private identifyStockouts(inventory: any[], sales: any[]) { return [] }
  private getSupplierPerformance() { return Promise.resolve([]) }
  private extractCustomerFeatures(customers: any[], transactions: any[]) { return [] }
  private identifyChurnedCustomers(customers: any[], transactions: any[]) { return [] }
  private calculateEngagementScores(customers: any[], transactions: any[]) { return [] }
}

// ML Model Classes
class DemandForecastingModel {
  private weights: number[] = []
  private trained: boolean = false

  async train(data: any) {
    // Implement time series forecasting (ARIMA, LSTM-like logic)
    console.log('Training demand forecasting model...')
    this.trained = true
  }

  async predict(params: any): Promise<DemandForecast> {
    if (!this.trained) throw new Error('Model not trained')
    
    // Simulate ML prediction
    const baselineDemand = Math.random() * 100 + 50
    const seasonalMultiplier = this.getSeasonalMultiplier(params.currentDate)
    const trendMultiplier = this.getTrendMultiplier(params.historicalData)
    
    const forecast = []
    for (let i = 0; i < params.forecastDays; i++) {
      const day = new Date(params.currentDate)
      day.setDate(day.getDate() + i)
      
      const demand = Math.round(
        baselineDemand * seasonalMultiplier * trendMultiplier * 
        (1 + (Math.random() - 0.5) * 0.2) // Add some noise
      )
      
      forecast.push({
        date: day.toISOString().split('T')[0],
        predictedDemand: demand,
        confidence: 0.85 + Math.random() * 0.1
      })
    }

    return {
      productId: params.productId,
      forecast,
      accuracy: 0.87,
      factors: {
        seasonal: seasonalMultiplier,
        trend: trendMultiplier,
        external: this.getExternalFactorImpact()
      }
    }
  }

  private getSeasonalMultiplier(date: Date): number {
    const month = date.getMonth()
    // Festival seasons have higher demand
    if ([9, 10, 11].includes(month)) return 1.3 // Oct-Dec (Diwali season)
    if ([2, 3].includes(month)) return 1.1 // Mar-Apr (Holi season)
    return 1.0
  }

  private getTrendMultiplier(historicalData: any[]): number {
    // Simple trend calculation
    return 1.05 // 5% growth trend
  }

  private getExternalFactorImpact(): number {
    return 1.02 // 2% positive impact from external factors
  }
}

class CustomerSegmentationModel {
  private clusters: any[] = []
  private trained: boolean = false

  async train(data: any) {
    console.log('Training customer segmentation model...')
    // Implement K-means clustering or similar
    this.trained = true
  }

  async analyze(params: any): Promise<CustomerInsights> {
    if (!this.trained) throw new Error('Model not trained')

    return {
      segments: [
        {
          name: 'VIP Customers',
          size: 15,
          characteristics: ['High spending', 'Frequent purchases', 'Long tenure'],
          averageSpending: 2500,
          retentionRate: 0.95,
          recommendations: ['Exclusive offers', 'Priority support', 'Early access to new products']
        },
        {
          name: 'Regular Customers',
          size: 45,
          characteristics: ['Moderate spending', 'Regular purchases', 'Price sensitive'],
          averageSpending: 800,
          retentionRate: 0.78,
          recommendations: ['Loyalty programs', 'Bundle offers', 'Seasonal discounts']
        },
        {
          name: 'New Customers',
          size: 25,
          characteristics: ['Recent acquisition', 'Exploring products', 'Need nurturing'],
          averageSpending: 350,
          retentionRate: 0.45,
          recommendations: ['Welcome offers', 'Product education', 'Follow-up campaigns']
        },
        {
          name: 'At-Risk Customers',
          size: 15,
          characteristics: ['Declining activity', 'Long gaps between purchases', 'High churn risk'],
          averageSpending: 200,
          retentionRate: 0.25,
          recommendations: ['Win-back campaigns', 'Special discounts', 'Personal outreach']
        }
      ],
      personalizedRecommendations: this.generatePersonalizedRecommendations(params.customerId),
      nextBestActions: this.getNextBestActions()
    }
  }

  private generatePersonalizedRecommendations(customerId?: string): any[] {
    if (!customerId) return []
    
    return [
      { product: 'Basmati Rice 5kg', reason: 'Frequently purchased', confidence: 0.89 },
      { product: 'Cooking Oil 2L', reason: 'Complementary product', confidence: 0.76 },
      { product: 'Toor Dal 1kg', reason: 'Seasonal demand', confidence: 0.65 }
    ]
  }

  private getNextBestActions(): any[] {
    return [
      { action: 'Send personalized offer to VIP customers', impact: 'High', effort: 'Low' },
      { action: 'Launch loyalty program for regular customers', impact: 'Medium', effort: 'Medium' },
      { action: 'Create win-back campaign for at-risk customers', impact: 'High', effort: 'High' }
    ]
  }
}

class PriceOptimizationModel {
  private trained: boolean = false

  async train(data: any) {
    console.log('Training price optimization model...')
    this.trained = true
  }

  async optimize(params: any): Promise<PriceOptimization> {
    if (!this.trained) throw new Error('Model not trained')

    const currentPrice = 120 // Mock current price
    const optimalPrice = this.calculateOptimalPrice(currentPrice, params)

    return {
      productId: params.productId,
      currentPrice,
      recommendedPrice: optimalPrice,
      expectedImpact: {
        demandChange: this.calculateDemandChange(currentPrice, optimalPrice),
        revenueChange: this.calculateRevenueChange(currentPrice, optimalPrice),
        profitChange: this.calculateProfitChange(currentPrice, optimalPrice)
      },
      confidence: 0.82,
      factors: {
        demandElasticity: params.demandElasticity,
        competitorPrices: params.competitorPrices,
        marketConditions: params.marketConditions
      },
      recommendations: [
        'Implement gradual price increase over 2 weeks',
        'Monitor competitor response',
        'Prepare promotional campaigns if demand drops'
      ]
    }
  }

  private calculateOptimalPrice(currentPrice: number, params: any): number {
    // Simple price optimization logic
    const elasticity = params.demandElasticity || 1.2
    const competitorAvg = 125 // Mock competitor average
    
    // Price slightly below competitor average for competitive advantage
    return Math.round(competitorAvg * 0.95)
  }

  private calculateDemandChange(currentPrice: number, newPrice: number): number {
    const priceChange = (newPrice - currentPrice) / currentPrice
    return -priceChange * 1.2 // Assuming elasticity of 1.2
  }

  private calculateRevenueChange(currentPrice: number, newPrice: number): number {
    const priceChange = (newPrice - currentPrice) / currentPrice
    const demandChange = this.calculateDemandChange(currentPrice, newPrice)
    return priceChange + demandChange + (priceChange * demandChange)
  }

  private calculateProfitChange(currentPrice: number, newPrice: number): number {
    // Assuming 30% margin
    const margin = 0.3
    const revenueChange = this.calculateRevenueChange(currentPrice, newPrice)
    return revenueChange * (1 + margin)
  }
}

class InventoryOptimizationModel {
  private trained: boolean = false

  async train(data: any) {
    console.log('Training inventory optimization model...')
    this.trained = true
  }

  async optimize(params: any): Promise<InventoryOptimization> {
    if (!this.trained) throw new Error('Model not trained')

    return {
      recommendations: [
        {
          productId: 'rice-1kg',
          productName: 'Basmati Rice 1kg',
          currentStock: 45,
          recommendedStock: 75,
          action: 'increase',
          reason: 'High demand forecast for festival season',
          urgency: 'high',
          expectedStockout: '2024-02-15',
          reorderPoint: 20,
          economicOrderQuantity: 50
        },
        {
          productId: 'dal-1kg',
          productName: 'Toor Dal 1kg',
          currentStock: 8,
          recommendedStock: 25,
          action: 'urgent_reorder',
          reason: 'Below safety stock level',
          urgency: 'critical',
          expectedStockout: '2024-02-05',
          reorderPoint: 15,
          economicOrderQuantity: 30
        },
        {
          productId: 'sugar-1kg',
          productName: 'Sugar 1kg',
          currentStock: 35,
          recommendedStock: 20,
          action: 'reduce',
          reason: 'Slow-moving inventory, reduce to optimize cash flow',
          urgency: 'low',
          expectedStockout: null,
          reorderPoint: 10,
          economicOrderQuantity: 25
        }
      ],
      totalOptimization: {
        currentValue: 125000,
        optimizedValue: 98000,
        savings: 27000,
        turnoverImprovement: 0.35
      },
      insights: [
        'Festival season approaching - increase staple food inventory',
        'Slow-moving items identified - consider promotional pricing',
        'Supplier lead times factored into reorder calculations'
      ]
    }
  }
}

class ChurnPredictionModel {
  private trained: boolean = false

  async train(data: any) {
    console.log('Training churn prediction model...')
    this.trained = true
  }

  async predict(params: any): Promise<ChurnPrediction> {
    if (!this.trained) throw new Error('Model not trained')

    return {
      overallChurnRate: 0.12,
      highRiskCustomers: [
        {
          customerId: 'cust_001',
          customerName: 'Suresh Patel',
          churnProbability: 0.85,
          riskFactors: ['No purchase in 45 days', 'Declining order frequency', 'Reduced spending'],
          lastPurchase: '2023-12-15',
          totalSpent: 2500,
          recommendations: [
            'Send personalized win-back offer',
            'Call for feedback',
            'Offer loyalty program enrollment'
          ]
        },
        {
          customerId: 'cust_002',
          customerName: 'Meera Joshi',
          churnProbability: 0.72,
          riskFactors: ['Complaint not resolved', 'Switched to competitor products'],
          lastPurchase: '2024-01-02',
          totalSpent: 1800,
          recommendations: [
            'Follow up on complaint resolution',
            'Offer compensation',
            'Provide superior product alternatives'
          ]
        }
      ],
      retentionStrategies: [
        {
          strategy: 'Personalized Offers',
          targetSegment: 'High-value at-risk customers',
          expectedRetention: 0.65,
          cost: 5000,
          roi: 3.2
        },
        {
          strategy: 'Loyalty Program',
          targetSegment: 'Medium-risk customers',
          expectedRetention: 0.45,
          cost: 8000,
          roi: 2.8
        }
      ]
    }
  }
}

class SalesForecastingModel {
  private trained: boolean = false

  async train(data: any) {
    console.log('Training sales forecasting model...')
    this.trained = true
  }

  async forecast(params: any): Promise<SalesForecast> {
    if (!this.trained) throw new Error('Model not trained')

    const period = params.period
    const forecastData = this.generateForecastData(period)

    return {
      period,
      forecast: forecastData,
      accuracy: 0.89,
      confidence: 0.85,
      trends: {
        overall: 'increasing',
        seasonal: 'festival_boost_expected',
        weekly: 'weekend_peak'
      },
      insights: [
        'Sales expected to increase by 15% next month due to festival season',
        'Weekend sales consistently 40% higher than weekdays',
        'Morning hours (6-9 AM) and evening hours (5-8 PM) are peak times'
      ],
      recommendations: [
        'Increase inventory for high-demand products',
        'Plan promotional campaigns for slow-moving items',
        'Optimize staff scheduling for peak hours'
      ]
    }
  }

  private generateForecastData(period: string): any[] {
    const data = []
    const baseValue = 4500
    const days = period === 'daily' ? 30 : period === 'weekly' ? 12 : 6

    for (let i = 0; i < days; i++) {
      const date = new Date()
      if (period === 'daily') {
        date.setDate(date.getDate() + i)
      } else if (period === 'weekly') {
        date.setDate(date.getDate() + (i * 7))
      } else {
        date.setMonth(date.getMonth() + i)
      }

      const seasonalFactor = this.getSeasonalFactor(date, period)
      const trendFactor = 1 + (i * 0.02) // 2% growth trend
      const randomFactor = 0.9 + Math.random() * 0.2 // ±10% variance

      const value = Math.round(baseValue * seasonalFactor * trendFactor * randomFactor)

      data.push({
        date: date.toISOString().split('T')[0],
        predictedSales: value,
        confidence: 0.85 + Math.random() * 0.1,
        factors: {
          seasonal: seasonalFactor,
          trend: trendFactor,
          random: randomFactor
        }
      })
    }

    return data
  }

  private getSeasonalFactor(date: Date, period: string): number {
    const month = date.getMonth()
    const dayOfWeek = date.getDay()

    // Monthly seasonality
    if ([9, 10, 11].includes(month)) return 1.4 // Festival season
    if ([2, 3].includes(month)) return 1.2 // Spring season
    if ([5, 6, 7].includes(month)) return 0.9 // Monsoon season

    // Weekly seasonality
    if (period === 'daily') {
      if ([0, 6].includes(dayOfWeek)) return 1.3 // Weekends
      if ([1, 2].includes(dayOfWeek)) return 0.8 // Monday-Tuesday
    }

    return 1.0
  }
}

// Type definitions
export interface DemandForecast {
  productId: string
  forecast: Array<{
    date: string
    predictedDemand: number
    confidence: number
  }>
  accuracy: number
  factors: {
    seasonal: number
    trend: number
    external: number
  }
}

export interface CustomerInsights {
  segments: Array<{
    name: string
    size: number
    characteristics: string[]
    averageSpending: number
    retentionRate: number
    recommendations: string[]
  }>
  personalizedRecommendations: Array<{
    product: string
    reason: string
    confidence: number
  }>
  nextBestActions: Array<{
    action: string
    impact: string
    effort: string
  }>
}

export interface PriceOptimization {
  productId: string
  currentPrice: number
  recommendedPrice: number
  expectedImpact: {
    demandChange: number
    revenueChange: number
    profitChange: number
  }
  confidence: number
  factors: any
  recommendations: string[]
}

export interface InventoryOptimization {
  recommendations: Array<{
    productId: string
    productName: string
    currentStock: number
    recommendedStock: number
    action: string
    reason: string
    urgency: string
    expectedStockout: string | null
    reorderPoint: number
    economicOrderQuantity: number
  }>
  totalOptimization: {
    currentValue: number
    optimizedValue: number
    savings: number
    turnoverImprovement: number
  }
  insights: string[]
}

export interface ChurnPrediction {
  overallChurnRate: number
  highRiskCustomers: Array<{
    customerId: string
    customerName: string
    churnProbability: number
    riskFactors: string[]
    lastPurchase: string
    totalSpent: number
    recommendations: string[]
  }>
  retentionStrategies: Array<{
    strategy: string
    targetSegment: string
    expectedRetention: number
    cost: number
    roi: number
  }>
}

export interface SalesForecast {
  period: string
  forecast: Array<{
    date: string
    predictedSales: number
    confidence: number
    factors: any
  }>
  accuracy: number
  confidence: number
  trends: {
    overall: string
    seasonal: string
    weekly: string
  }
  insights: string[]
  recommendations: string[]
}

// Additional type definitions
interface SeasonalityData {
  monthly: Array<[number, number]>
  weekly: Array<[number, number]>
  daily: Array<[number, number]>
}

interface ExternalFactors {
  festivals: Array<{ name: string; date: string; impact: string }>
  weather: { temperature: number; humidity: number; rainfall: number }
  economicIndicators: { inflation: number; gdpGrowth: number; consumerIndex: number }
  marketEvents: Array<{ event: string; impact: string; products: string[] }>
}

interface CustomerMetrics {
  customerId: string
  totalSpent: number
  frequency: number
  recency: number
  averageOrderValue: number
  lifetimeValue: number
  churnRisk: number
}
