'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, Send, Bot, User, BarChart3, TrendingUp, Package, Users, IndianRupee, FileText, Download, Share, Mic, Image, Paperclip, ThumbsUp, ThumbsDown, Copy, RefreshCw } from 'lucide-react'

interface BusinessInsightsChatProps {
  businessType: string
}

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  attachments?: Array<{
    type: 'chart' | 'report' | 'image'
    data: any
    title: string
  }>
  suggestions?: string[]
}

export function BusinessInsightsChat({ businessType }: BusinessInsightsChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI Business Insights Assistant for your ${businessType}. I can help you with:\n\n📊 Real-time analytics and reports\n💡 Business recommendations\n📈 Sales forecasting\n👥 Customer insights\n💰 Financial analysis\n📦 Inventory optimization\n\nWhat would you like to explore today?`,
      timestamp: new Date(),
      suggestions: [
        'Show me today\'s sales performance',
        'What are my top selling products?',
        'Generate monthly financial report',
        'Analyze customer behavior trends',
        'Predict next month\'s inventory needs'
      ]
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): ChatMessage => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('sales') || lowerQuery.includes('revenue')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `📊 **Sales Performance Analysis**\n\nHere's your current sales overview:\n\n💰 **Today's Revenue**: ₹12,500 (+15% vs yesterday)\n📦 **Orders**: 23 orders (+8% vs yesterday)\n👥 **Customers**: 18 unique customers\n📈 **Avg Order Value**: ₹543\n\n**Top Performing Products:**\n1. Basmati Rice 1kg - 8 units (₹960)\n2. Cooking Oil 1L - 6 units (₹720)\n3. Toor Dal 1kg - 5 units (₹750)\n\n**Key Insights:**\n• Peak sales time: 6-8 PM (40% of daily sales)\n• Weekend sales are 35% higher\n• Rice and Dal combo sales increased by 25%\n\n**Recommendations:**\n✅ Stock more Rice and Dal for evening rush\n✅ Create combo offers for Rice + Dal + Oil\n✅ Plan weekend promotions for maximum impact`,
        timestamp: new Date(),
        attachments: [{
          type: 'chart',
          data: generateSalesChartData(),
          title: 'Daily Sales Trend'
        }],
        suggestions: [
          'Show me weekly sales comparison',
          'Which products have declining sales?',
          'Generate sales forecast for next week'
        ]
      }
    }

    if (lowerQuery.includes('customer') || lowerQuery.includes('behavior')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `👥 **Customer Behavior Analysis**\n\n**Customer Segments:**\n🌟 **VIP Customers**: 15 customers (₹2,500 avg spending)\n🔄 **Regular Customers**: 45 customers (₹800 avg spending)\n🆕 **New Customers**: 25 customers (₹350 avg spending)\n⚠️ **At-Risk**: 12 customers (haven't visited in 30+ days)\n\n**Behavioral Insights:**\n• 68% customers prefer digital payments\n• Average visit frequency: 2.3 times per week\n• Most popular shopping time: 7-9 AM, 6-8 PM\n• 85% customers buy Rice + Dal together\n\n**Customer Lifetime Value:**\n• VIP: ₹15,000 (12 months)\n• Regular: ₹9,600 (12 months)\n• New: ₹4,200 (projected)\n\n**Retention Strategies:**\n✅ Launch loyalty program for regular customers\n✅ Send personalized offers to VIP customers\n✅ Win-back campaign for at-risk customers\n✅ Welcome series for new customers`,
        timestamp: new Date(),
        attachments: [{
          type: 'chart',
          data: generateCustomerSegmentData(),
          title: 'Customer Segmentation'
        }],
        suggestions: [
          'Show me customer churn prediction',
          'Which customers need attention?',
          'Create loyalty program strategy'
        ]
      }
    }

    if (lowerQuery.includes('inventory') || lowerQuery.includes('stock')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `📦 **Inventory Intelligence Report**\n\n**Current Stock Status:**\n🔴 **Critical**: 3 items need immediate attention\n🟡 **Low**: 8 items below reorder point\n🟢 **Optimal**: 45 items well-stocked\n\n**Urgent Actions Required:**\n⚠️ **Toor Dal 1kg**: Only 8 left (Reorder 30 units)\n⚠️ **Sugar 1kg**: Only 12 left (Reorder 25 units)\n⚠️ **Tea Powder**: Only 6 left (Reorder 15 units)\n\n**AI Predictions:**\n📈 **High Demand Next Week**: Rice (festival season)\n📉 **Slow Moving**: Wheat Flour (reduce by 20%)\n🎯 **Optimal Reorder**: Every Tuesday for best prices\n\n**Cost Optimization:**\n💰 **Potential Savings**: ₹15,000/month\n📊 **Turnover Rate**: 2.3x (Industry avg: 1.8x)\n🚚 **Supplier Performance**: 92% on-time delivery\n\n**Smart Recommendations:**\n✅ Increase Rice inventory by 40% for festival season\n✅ Bundle slow-moving items with popular products\n✅ Negotiate bulk discounts with top suppliers`,
        timestamp: new Date(),
        attachments: [{
          type: 'chart',
          data: generateInventoryData(),
          title: 'Inventory Status Overview'
        }],
        suggestions: [
          'Generate purchase order for low stock items',
          'Show me supplier performance analysis',
          'Predict inventory needs for next month'
        ]
      }
    }

    if (lowerQuery.includes('financial') || lowerQuery.includes('profit') || lowerQuery.includes('report')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `💰 **Financial Performance Dashboard**\n\n**Monthly Overview (Current Month):**\n📊 **Total Revenue**: ₹1,25,000 (+15.2% vs last month)\n💵 **Total Expenses**: ₹85,000 (+8.5% vs last month)\n✅ **Net Profit**: ₹40,000 (+32% vs last month)\n📈 **Profit Margin**: 32% (Industry avg: 25%)\n\n**Revenue Breakdown:**\n• Product Sales: ₹1,10,000 (88%)\n• Services: ₹15,000 (12%)\n\n**Expense Categories:**\n• Inventory Purchase: ₹65,000 (76%)\n• Operating Costs: ₹12,000 (14%)\n• Marketing: ₹5,000 (6%)\n• Utilities: ₹3,000 (4%)\n\n**Key Financial Metrics:**\n📊 **ROI**: 47% (Excellent)\n💳 **Cash Flow**: +₹25,000 (Healthy)\n🏦 **Working Capital**: ₹85,000\n📈 **Growth Rate**: 15.2% month-over-month\n\n**AI Insights:**\n✅ Strong profit margins indicate healthy pricing\n✅ Cash flow positive - good for expansion\n⚠️ Consider diversifying revenue streams\n💡 Opportunity to invest in marketing for growth`,
        timestamp: new Date(),
        attachments: [{
          type: 'report',
          data: generateFinancialReport(),
          title: 'Detailed Financial Report'
        }],
        suggestions: [
          'Generate tax report for GST filing',
          'Show me cash flow projection',
          'Create loan application report'
        ]
      }
    }

    if (lowerQuery.includes('forecast') || lowerQuery.includes('predict')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `🔮 **AI Business Forecasting**\n\n**Next Month Predictions:**\n📈 **Revenue Forecast**: ₹1,45,000 (+16% growth)\n📦 **Expected Orders**: 720 orders\n👥 **New Customers**: 28 acquisitions\n💰 **Profit Projection**: ₹48,000\n\n**Seasonal Trends:**\n🎉 **Festival Impact**: +25% sales expected\n🌧️ **Monsoon Effect**: -10% footfall\n📅 **Weekend Boost**: +40% vs weekdays\n\n**Product Demand Forecast:**\n📊 **High Demand**: Rice (+30%), Dal (+25%)\n📉 **Declining**: Sugar (-5%), Wheat (-8%)\n🆕 **Opportunity**: Organic products (+45%)\n\n**Market Intelligence:**\n🏪 **Competition**: 2 new stores opening nearby\n💱 **Price Trends**: Cooking oil prices rising 8%\n📱 **Digital Adoption**: +35% online orders\n\n**Strategic Recommendations:**\n✅ Increase inventory for high-demand products\n✅ Launch pre-festival marketing campaign\n✅ Consider online delivery expansion\n✅ Negotiate long-term contracts for stable pricing\n\n**Risk Factors:**\n⚠️ Supply chain disruption (15% probability)\n⚠️ New competitor impact (moderate risk)\n⚠️ Seasonal demand fluctuation`,
        timestamp: new Date(),
        attachments: [{
          type: 'chart',
          data: generateForecastData(),
          title: 'Revenue Forecast Chart'
        }],
        suggestions: [
          'Show me detailed demand forecast by product',
          'What are the biggest risks to my business?',
          'Create expansion strategy based on forecasts'
        ]
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: `I understand you're asking about "${query}". Let me analyze your business data and provide insights.\n\n**Quick Business Overview:**\n📊 **Current Status**: Your ${businessType} is performing well\n📈 **Growth**: +15.2% this month\n💰 **Profit Margin**: 32% (Above industry average)\n\n**Available Analysis:**\n• Sales performance and trends\n• Customer behavior insights\n• Inventory optimization\n• Financial health check\n• Market forecasting\n• Competitive analysis\n\nWhat specific aspect would you like me to dive deeper into?`,
      timestamp: new Date(),
      suggestions: [
        'Analyze my sales performance',
        'Show customer insights',
        'Check inventory status',
        'Generate financial report',
        'Predict next month trends'
      ]
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition implementation would go here
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const generateSalesChartData = () => {
    return [
      { time: '9 AM', sales: 1200 },
      { time: '11 AM', sales: 800 },
      { time: '1 PM', sales: 1500 },
      { time: '3 PM', sales: 900 },
      { time: '5 PM', sales: 2100 },
      { time: '7 PM', sales: 3200 },
      { time: '9 PM', sales: 2800 }
    ]
  }

  const generateCustomerSegmentData = () => {
    return [
      { segment: 'VIP', count: 15, value: 37500 },
      { segment: 'Regular', count: 45, value: 36000 },
      { segment: 'New', count: 25, value: 8750 },
      { segment: 'At-Risk', count: 12, value: 2400 }
    ]
  }

  const generateInventoryData = () => {
    return [
      { product: 'Rice', current: 45, optimal: 60, status: 'low' },
      { product: 'Dal', current: 8, optimal: 25, status: 'critical' },
      { product: 'Oil', current: 32, optimal: 30, status: 'optimal' },
      { product: 'Sugar', current: 12, optimal: 20, status: 'low' }
    ]
  }

  const generateFinancialReport = () => {
    return {
      revenue: 125000,
      expenses: 85000,
      profit: 40000,
      margin: 32,
      growth: 15.2
    }
  }

  const generateForecastData = () => {
    return [
      { month: 'Current', revenue: 125000 },
      { month: 'Next', revenue: 145000 },
      { month: 'Month+2', revenue: 158000 },
      { month: 'Month+3', revenue: 172000 }
    ]
  }

  return (
    <div className="flex flex-col h-[800px] max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                AI Business Insights Chat
              </CardTitle>
              <CardDescription>
                Get instant business intelligence and recommendations
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                AI Online
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Chat
              </Button>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg'
                      : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                  } p-4`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">AI Business Assistant</span>
                    </div>
                  )}
                  
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.content}
                  </div>

                  {message.attachments && (
                    <div className="mt-4 space-y-3">
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{attachment.title}</h5>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Share className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          {attachment.type === 'chart' && (
                            <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded flex items-center justify-center">
                              <BarChart3 className="w-8 h-8 text-blue-500" />
                              <span className="ml-2 text-sm text-gray-600">Interactive Chart</span>
                            </div>
                          )}
                          {attachment.type === 'report' && (
                            <div className="h-32 bg-gradient-to-r from-green-50 to-blue-50 rounded flex items-center justify-center">
                              <FileText className="w-8 h-8 text-green-500" />
                              <span className="ml-2 text-sm text-gray-600">Detailed Report</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {message.suggestions && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs opacity-70">Suggested questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.type === 'ai' && (
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyMessage(message.content)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-r-lg rounded-tl-lg p-4 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">AI is analyzing your data...</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 p-6 border-t bg-gray-50">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFileUpload}
              className="flex-shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className={`flex-shrink-0 ${isListening ? 'bg-red-100 border-red-300' : ''}`}
            >
              <Mic className={`w-4 h-4 ${isListening ? 'text-red-600' : ''}`} />
            </Button>
            <Input
              placeholder="Ask me anything about your business..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.xlsx,.csv,.jpg,.png"
          />
        </div>
      </Card>
    </div>
  )
}
