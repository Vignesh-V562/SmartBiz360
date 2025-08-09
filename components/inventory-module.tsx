'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Package, AlertTriangle, TrendingUp, Search, Plus, Scan, Calendar, BarChart3 } from 'lucide-react'

interface InventoryModuleProps {
  businessType: string
}

export function InventoryModule({ businessType }: InventoryModuleProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const inventoryItems = [
    {
      id: 1,
      name: 'Basmati Rice 1kg',
      category: 'Grains',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      price: 120,
      lastRestocked: '2024-01-15',
      expiryDate: '2024-06-15',
      supplier: 'ABC Traders'
    },
    {
      id: 2,
      name: 'Toor Dal 1kg',
      category: 'Pulses',
      currentStock: 8,
      minStock: 15,
      maxStock: 50,
      price: 150,
      lastRestocked: '2024-01-10',
      expiryDate: '2024-08-10',
      supplier: 'XYZ Suppliers'
    },
    {
      id: 3,
      name: 'Cooking Oil 1L',
      category: 'Oil',
      currentStock: 25,
      minStock: 10,
      maxStock: 60,
      price: 180,
      lastRestocked: '2024-01-12',
      expiryDate: '2024-12-12',
      supplier: 'Oil Co.'
    }
  ]

  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock)
  const expiringItems = inventoryItems.filter(item => {
    const expiryDate = new Date(item.expiryDate)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return expiryDate <= thirtyDaysFromNow
  })

  const getStockStatus = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100
    if (current <= min) return { status: 'low', color: 'bg-red-500', percentage }
    if (percentage < 50) return { status: 'medium', color: 'bg-yellow-500', percentage }
    return { status: 'good', color: 'bg-green-500', percentage }
  }

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{inventoryItems.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">{expiringItems.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(lowStockItems.length > 0 || expiringItems.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockItems.map((item) => (
              <div key={`low-${item.id}`} className="p-3 bg-red-50 border-l-4 border-red-400 rounded-lg">
                <p className="text-sm font-medium text-red-800">Low Stock Alert</p>
                <p className="text-sm text-red-600">
                  {item.name} - Only {item.currentStock} left (Min: {item.minStock})
                </p>
              </div>
            ))}
            {expiringItems.map((item) => (
              <div key={`exp-${item.id}`} className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded-lg">
                <p className="text-sm font-medium text-orange-800">Expiry Alert</p>
                <p className="text-sm text-orange-600">
                  {item.name} expires on {new Date(item.expiryDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Inventory Management</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Scan className="w-4 h-4 mr-2" />
                Scan
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Inventory List */}
          <div className="space-y-4">
            {inventoryItems.map((item) => {
              const stockInfo = getStockStatus(item.currentStock, item.minStock, item.maxStock)
              return (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.category} • ₹{item.price}</p>
                      <p className="text-xs text-gray-400">Supplier: {item.supplier}</p>
                    </div>
                    <Badge 
                      variant={stockInfo.status === 'low' ? 'destructive' : 
                              stockInfo.status === 'medium' ? 'secondary' : 'default'}
                    >
                      {item.currentStock} units
                    </Badge>
                  </div>

                  {/* Stock Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Stock Level</span>
                      <span>{item.currentStock}/{item.maxStock}</span>
                    </div>
                    <Progress value={stockInfo.percentage} className="h-2" />
                  </div>

                  {/* Item Details */}
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                      <span className="font-medium">Last Restocked:</span>
                      <br />
                      {new Date(item.lastRestocked).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Expires:</span>
                      <br />
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      Update Stock
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit Item
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-sm">Add Stock</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Package className="w-5 h-5 mb-1" />
              <span className="text-sm">New Product</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <TrendingUp className="w-5 h-5 mb-1" />
              <span className="text-sm">Stock Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Scan className="w-5 h-5 mb-1" />
              <span className="text-sm">Bulk Scan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
