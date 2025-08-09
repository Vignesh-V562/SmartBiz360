'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Store,Smartphone, Scissors, Pill, Car, Wrench, ShoppingBag, Coffee } from 'lucide-react'
import Image from 'next/image'

interface OnboardingFlowProps {
  onBusinessSelect: (businessType: string) => void
}

const businessTypes = [
  {
    id: 'SmartMart',
    name: 'SmartMart',
    icon:Store,
    description: 'Grocery & daily essentials',
    color: 'bg-green-500'
  },
  {
    id: 'mobile',
    name: 'Mobile Shop',
    icon: Smartphone,
    description: 'Mobile phones & accessories',
    color: 'bg-blue-500'
  },
  {
    id: 'tailor',
    name: 'Tailor Shop',
    icon: Scissors,
    description: 'Clothing & alterations',
    color: 'bg-purple-500'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    icon: Pill,
    description: 'Medicines & healthcare',
    color: 'bg-red-500'
  },
  {
    id: 'auto',
    name: 'Auto Service',
    icon: Car,
    description: 'Vehicle repair & service',
    color: 'bg-orange-500'
  },
  {
    id: 'workshop',
    name: 'Workshop',
    icon: Wrench,
    description: 'Manufacturing & repair',
    color: 'bg-gray-500'
  },
  {
    id: 'retail',
    name: 'Retail Store',
    icon: ShoppingBag,
    description: 'General merchandise',
    color: 'bg-pink-500'
  },
  {
    id: 'restaurant',
    name: 'Restaurant/Cafe',
    icon: Coffee,
    description: 'Food & beverages',
    color: 'bg-yellow-500'
  }
]

export function OnboardingFlow({ onBusinessSelect }: OnboardingFlowProps) {
  const [selectedBusiness, setSelectedBusiness] = useState('')

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
<div className="flex items-center justify-center mb-4">
  <Image 
    src="/logo.jpg"
    alt="SmartBiz360 Logo"
    width={200}
    height={200}
    className="object-cover rounded-lg" 
  />
</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to SmartBiz360
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          AI-Powered Business Toolkit for MSMEs
        </p>
        <Badge variant="secondary" className="text-sm">
          🇮🇳 Made for Indian Businesses
        </Badge>
      </div>

      {/* Business Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Select Your Business Type</CardTitle>
          <CardDescription>
            Choose the category that best describes your business to get personalized features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {businessTypes.map((business) => {
              const Icon = business.icon
              return (
                <Card
                  key={business.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBusiness === business.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedBusiness(business.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${business.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{business.name}</h3>
                    <p className="text-xs text-gray-500">{business.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">What You'll Get</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">GST-compliant digital billing</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Smart inventory tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">WhatsApp/SMS automation</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">AI-powered insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Voice input support</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Regional language support</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="text-center">
        <Button
          onClick={() => selectedBusiness && onBusinessSelect(selectedBusiness)}
          disabled={!selectedBusiness}
          size="lg"
          className="px-8"
        >
          Continue Setup →
        </Button>
      </div>
    </div>
  )
}
