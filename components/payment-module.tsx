'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, Smartphone, Banknote, QrCode, Clock, CheckCircle, XCircle, ArrowUpRight, ArrowDownLeft, Filter, Download, Plus, Wallet, Building, Users } from 'lucide-react'

interface PaymentModuleProps {
  businessType: string
}

export function PaymentModule({ businessType }: PaymentModuleProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi')
  const [amount, setAmount] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, color: 'bg-green-500', description: 'PhonePe, GPay, Paytm' },
    { id: 'card', name: 'Card', icon: CreditCard, color: 'bg-blue-500', description: 'Debit/Credit Cards' },
    { id: 'cash', name: 'Cash', icon: Banknote, color: 'bg-gray-500', description: 'Physical Cash' },
    { id: 'qr', name: 'QR Code', icon: QrCode, color: 'bg-purple-500', description: 'Scan & Pay' }
  ]

  const todayPayments = {
    total: 12500,
    upi: 8500,
    card: 2800,
    cash: 1200,
    transactions: 23
  }

  const recentTransactions = [
    {
      id: 'TXN001',
      customer: 'Rajesh Kumar',
      amount: 850,
      method: 'UPI',
      status: 'completed',
      time: '2 min ago',
      reference: 'UPI123456789'
    },
    {
      id: 'TXN002',
      customer: 'Priya Sharma',
      amount: 1200,
      method: 'Card',
      status: 'completed',
      time: '15 min ago',
      reference: 'CARD987654321'
    },
    {
      id: 'TXN003',
      customer: 'Amit Singh',
      amount: 650,
      method: 'Cash',
      status: 'completed',
      time: '1 hour ago',
      reference: 'CASH001'
    },
    {
      id: 'TXN004',
      customer: 'Suresh Patel',
      amount: 2500,
      method: 'UPI',
      status: 'pending',
      time: '2 hours ago',
      reference: 'UPI987654321'
    },
    {
      id: 'TXN005',
      customer: 'Meera Joshi',
      amount: 450,
      method: 'QR',
      status: 'failed',
      time: '3 hours ago',
      reference: 'QR123456789'
    }
  ]

  const monthlyStats = [
    { month: 'Jan', upi: 45000, card: 25000, cash: 15000 },
    { month: 'Feb', upi: 52000, card: 28000, cash: 18000 },
    { month: 'Mar', upi: 48000, card: 22000, cash: 16000 },
    { month: 'Apr', upi: 58000, card: 32000, cash: 20000 },
    { month: 'May', upi: 65000, card: 35000, cash: 22000 },
    { month: 'Jun', upi: 72000, card: 38000, cash: 25000 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handlePayment = () => {
    console.log('Processing payment:', { amount, method: selectedPaymentMethod, customer: customerPhone })
    // Reset form
    setAmount('')
    setCustomerPhone('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <CreditCard className="w-6 h-6 mr-2" />
                Payment Management
              </CardTitle>
              <CardDescription>Accept and manage payments for your {businessType}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Total</p>
                <p className="text-2xl font-bold text-green-600">₹{todayPayments.total.toLocaleString()}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">UPI Payments</p>
                <p className="text-xl font-bold text-blue-600">₹{todayPayments.upi.toLocaleString()}</p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Card Payments</p>
                <p className="text-xl font-bold text-purple-600">₹{todayPayments.card.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cash Payments</p>
                <p className="text-xl font-bold text-gray-600">₹{todayPayments.cash.toLocaleString()}</p>
              </div>
              <Banknote className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-orange-600">{todayPayments.transactions}</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accept" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accept">Accept Payment</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="accept" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accept New Payment</CardTitle>
                <CardDescription>Process customer payments quickly and securely</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="customer">Customer Phone (Optional)</Label>
                  <Input
                    id="customer"
                    placeholder="Enter customer phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon
                      return (
                        <Button
                          key={method.id}
                          variant={selectedPaymentMethod === method.id ? 'default' : 'outline'}
                          className="h-16 flex-col"
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center mb-1`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm">{method.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <Button 
                  className="w-full h-12 text-lg"
                  onClick={handlePayment}
                  disabled={!amount}
                >
                  Accept Payment ₹{amount || '0'}
                </Button>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">QR Code Payment</CardTitle>
                <CardDescription>Let customers scan and pay instantly</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Show this QR code to customers for instant UPI payments
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Manual Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <h4 className="font-medium">{transaction.customer}</h4>
                        <p className="text-sm text-gray-500">
                          {transaction.method} • {transaction.reference} • {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg">₹{transaction.amount.toLocaleString()}</p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Method Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-green-500" />
                      <span>UPI Payments</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{todayPayments.upi.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">68% of total</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      <span>Card Payments</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{todayPayments.card.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">22% of total</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Banknote className="w-4 h-4 text-gray-500" />
                      <span>Cash Payments</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{todayPayments.cash.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">10% of total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Payment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.slice(-3).map((stat, index) => (
                    <div key={stat.month} className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">{stat.month} 2024</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>UPI: ₹{stat.upi.toLocaleString()}</span>
                          <span>Card: ₹{stat.card.toLocaleString()}</span>
                          <span>Cash: ₹{stat.cash.toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-medium text-green-600">
                          Total: ₹{(stat.upi + stat.card + stat.cash).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📱 Digital Adoption</h4>
                  <p className="text-2xl font-bold text-blue-800">90%</p>
                  <p className="text-sm text-blue-600">Customers prefer digital payments</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">⚡ Average Speed</h4>
                  <p className="text-2xl font-bold text-green-800">12 sec</p>
                  <p className="text-sm text-green-600">Average transaction time</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">💰 Peak Hours</h4>
                  <p className="text-2xl font-bold text-purple-800">6-8 PM</p>
                  <p className="text-sm text-purple-600">Highest payment volume</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Gateway Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Gateway Settings</CardTitle>
                <CardDescription>Configure your payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">UPI Gateway</h4>
                        <p className="text-sm text-gray-500">PhonePe, GPay, Paytm</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Card Gateway</h4>
                        <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-purple-500" />
                      <div>
                        <h4 className="font-medium">Net Banking</h4>
                        <p className="text-sm text-gray-500">All major banks</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>
                </div>
                <Button className="w-full">
                  Configure Gateways
                </Button>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Details</CardTitle>
                <CardDescription>Update your business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="SmartBiz Store" />
                </div>
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" defaultValue="smartbiz@paytm" />
                </div>
                <div>
                  <Label htmlFor="bankAccount">Bank Account</Label>
                  <Input id="bankAccount" defaultValue="****1234" />
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input id="gstNumber" defaultValue="27XXXXX1234X1ZX" />
                </div>
                <Button className="w-full">
                  Update Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
