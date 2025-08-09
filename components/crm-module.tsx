'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar'
import { Users, MessageSquare, Phone, Mail, Calendar, Gift, Search, Plus, Filter, Send, Star, TrendingUp } from 'lucide-react'

interface CRMModuleProps {
  businessType: string
}

export function CRMModule({ businessType }: CRMModuleProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const customers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      totalSpent: 15600,
      lastVisit: '2024-01-20',
      visits: 12,
      status: 'regular',
      loyaltyPoints: 156,
      preferredItems: ['Basmati Rice', 'Cooking Oil']
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@email.com',
      totalSpent: 8900,
      lastVisit: '2024-01-18',
      visits: 8,
      status: 'new',
      loyaltyPoints: 89,
      preferredItems: ['Toor Dal', 'Wheat Flour']
    },
    {
      id: 3,
      name: 'Amit Singh',
      phone: '+91 76543 21098',
      email: 'amit@email.com',
      totalSpent: 25400,
      lastVisit: '2024-01-15',
      visits: 25,
      status: 'vip',
      loyaltyPoints: 254,
      preferredItems: ['Premium Rice', 'Organic Dal']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'regular': return 'bg-blue-100 text-blue-800'
      case 'new': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* CRM Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP Customers</p>
                <p className="text-2xl font-bold text-purple-600">
                  {customers.filter(c => c.status === 'vip').length}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Spend</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold text-orange-600">47</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Customer Management</CardTitle>
              <CardDescription>Manage your customer relationships</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Customer List */}
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{customer.name}</h4>
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                      <p className="text-xs text-gray-400">{customer.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Customer Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">₹{customer.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Total Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{customer.visits}</p>
                    <p className="text-xs text-gray-500">Visits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">{customer.loyaltyPoints}</p>
                    <p className="text-xs text-gray-500">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-orange-600">
                      {Math.floor((Date.now() - new Date(customer.lastVisit).getTime()) / (1000 * 60 * 60 * 24))}d
                    </p>
                    <p className="text-xs text-gray-500">Last Visit</p>
                  </div>
                </div>

                {/* Preferred Items */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Preferred Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {customer.preferredItems.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Gift className="w-3 h-3 mr-1" />
                    Offer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Center */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Communication Center
          </CardTitle>
          <CardDescription>Send messages and offers to customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Messages */}
            <div>
              <h4 className="font-medium mb-3">Quick Messages</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Payment reminder
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Gift className="w-4 h-4 mr-2" />
                  Special offer
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  New stock arrival
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Star className="w-4 h-4 mr-2" />
                  Thank you message
                </Button>
              </div>
            </div>

            {/* Recent Messages */}
            <div>
              <h4 className="font-medium mb-3">Recent Messages</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium">WhatsApp to Rajesh Kumar</p>
                  <p className="text-xs text-gray-600">"New stock of Basmati Rice available!"</p>
                  <p className="text-xs text-gray-400">2 hours ago • Delivered</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">SMS to Priya Sharma</p>
                  <p className="text-xs text-gray-600">"Your loyalty points: 89. Redeem now!"</p>
                  <p className="text-xs text-gray-400">1 day ago • Read</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium">WhatsApp to Amit Singh</p>
                  <p className="text-xs text-gray-600">"VIP discount: 10% off on premium items"</p>
                  <p className="text-xs text-gray-400">2 days ago • Delivered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send Message */}
          <div className="mt-6 p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Send New Message</h4>
            <div className="space-y-3">
              <Input placeholder="Select customers or enter phone numbers..." />
              <Input placeholder="Message content..." />
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send WhatsApp
                </Button>
                <Button variant="outline" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send SMS
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
