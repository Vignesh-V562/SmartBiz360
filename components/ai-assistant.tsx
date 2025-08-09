'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, X, BarChart3, TrendingUp, Users, Package, Lightbulb, MessageSquare } from 'lucide-react'

interface AIAssistantProps {
  onClose: () => void
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your SmartBiz360 AI assistant. I can help you with business insights, analytics, and recommendations. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const quickQuestions = [
    'What are my top selling products?',
    'Show me this month\'s profit',
    'Which customers haven\'t visited recently?',
    'What items are running low?',
    'How can I increase sales?',
    'Generate a sales report'
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      type: 'ai',
      content: getAIResponse(inputMessage),
      timestamp: new Date()
    }

    setMessages([...messages, userMessage, aiResponse])
    setInputMessage('')
  }

  const getAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('top selling') || lowerQuestion.includes('best selling')) {
      return 'Based on your sales data, your top 3 selling products this month are:\n\n1. Basmati Rice 1kg - 45 units sold\n2. Cooking Oil 1L - 32 units sold\n3. Toor Dal 1kg - 28 units sold\n\nThese items contribute to 60% of your total revenue. Consider stocking more of these popular items!'
    }
    
    if (lowerQuestion.includes('profit') || lowerQuestion.includes('earnings')) {
      return 'Your profit analysis for this month:\n\n💰 Total Revenue: ₹1,25,000\n📊 Total Costs: ₹85,000\n✅ Net Profit: ₹40,000\n📈 Profit Margin: 32%\n\nThis is a 15% increase compared to last month. Great job!'
    }
    
    if (lowerQuestion.includes('customer') && lowerQuestion.includes('visit')) {
      return 'I found 8 customers who haven\'t visited in the last 30 days:\n\n• Suresh Patel - Last visit: 35 days ago\n• Meera Joshi - Last visit: 42 days ago\n• Ravi Kumar - Last visit: 38 days ago\n\nWould you like me to help you send them a "We miss you" message with a special offer?'
    }
    
    if (lowerQuestion.includes('low') || lowerQuestion.includes('stock')) {
      return 'Items running low in stock:\n\n🔴 Toor Dal 1kg - Only 8 left (Min: 15)\n🟡 Sugar 1kg - Only 12 left (Min: 20)\n🟡 Tea Powder 250g - Only 6 left (Min: 10)\n\nI recommend restocking these items soon to avoid stockouts.'
    }
    
    if (lowerQuestion.includes('increase sales') || lowerQuestion.includes('grow business')) {
      return 'Here are 5 AI-powered recommendations to increase your sales:\n\n1. 📱 Send WhatsApp offers to customers who buy rice - they often need dal too\n2. 🎯 Create combo offers: Rice + Dal + Oil bundles\n3. 📅 Send weekly reminders to regular customers\n4. 🏆 Launch a loyalty program - customers love points!\n5. 📊 Stock more items during festival seasons\n\nWould you like me to help implement any of these strategies?'
    }
    
    return 'I understand your question about "' + question + '". Let me analyze your business data and provide insights. Based on your current performance, I can help you with sales analytics, inventory optimization, customer engagement strategies, and profit maximization. What specific aspect would you like me to focus on?'
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    handleSendMessage()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Business Assistant</CardTitle>
                <CardDescription>Get insights and recommendations for your business</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Quick Questions */}
        <div className="px-6 pb-4 flex-shrink-0">
          <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.slice(0, 3).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="w-4 h-4" />
                      <span className="text-sm font-medium">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-6 border-t flex-shrink-0">
          <div className="flex space-x-2">
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
          <div className="flex flex-wrap gap-2 mt-2">
            {quickQuestions.slice(3).map((question, index) => (
              <Button
                key={index + 3}
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
