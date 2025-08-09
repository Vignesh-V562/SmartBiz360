'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Receipt, Plus, Minus, Search, Printer, Share, IndianRupee, Scan, Calculator } from 'lucide-react'

interface BillingModuleProps {
  businessType: string
}

export function BillingModule({ businessType }: BillingModuleProps) {
  const [billItems, setBillItems] = useState([
    { id: 1, name: 'Basmati Rice 1kg', price: 120, quantity: 2, gst: 5 },
    { id: 2, name: 'Toor Dal 1kg', price: 150, quantity: 1, gst: 5 }
  ])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const gstAmount = billItems.reduce((sum, item) => sum + (item.price * item.quantity * item.gst / 100), 0)
  const total = subtotal + gstAmount

  const updateQuantity = (id: number, change: number) => {
    setBillItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  return (
    <div className="space-y-6">
      {/* New Bill Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Receipt className="w-6 h-6 mr-2" />
                New Bill
              </CardTitle>
              <CardDescription>Create GST-compliant digital bill</CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              Bill #1235
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                placeholder="Enter phone number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Items</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Scan className="w-4 h-4 mr-2" />
                Scan
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Item List */}
          <div className="space-y-3 mb-4">
            {billItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">₹{item.price} • GST {item.gst}%</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Item Button */}
          <Button variant="dashed" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardContent>
      </Card>

      {/* Bill Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Bill Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-12">
          <Share className="w-4 h-4 mr-2" />
          Share Bill
        </Button>
        <Button variant="outline" className="h-12">
          <Printer className="w-4 h-4 mr-2" />
          Print Bill
        </Button>
        <Button className="h-12 bg-green-600 hover:bg-green-700">
          <IndianRupee className="w-4 h-4 mr-2" />
          Complete Sale
        </Button>
      </div>

      {/* Recent Bills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: '1234', customer: 'Rajesh Kumar', amount: 850, time: '2 min ago' },
              { id: '1233', customer: 'Priya Sharma', amount: 1200, time: '15 min ago' },
              { id: '1232', customer: 'Amit Singh', amount: 650, time: '1 hour ago' }
            ].map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Bill #{bill.id}</p>
                  <p className="text-sm text-gray-500">{bill.customer} • {bill.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">₹{bill.amount}</p>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
