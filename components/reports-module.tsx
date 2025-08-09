'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Download, Share, Calendar, TrendingUp, Users, Package, IndianRupee, BarChart3, PieChart, FileSpreadsheet, FileIcon as FilePdf, Mail, Printer } from 'lucide-react'

interface ReportsModuleProps {
  businessType: string
}

export function ReportsModule({ businessType }: ReportsModuleProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedReport, setSelectedReport] = useState('sales')

  const reportTypes = [
    {
      id: 'sales',
      name: 'Sales Report',
      description: 'Detailed sales analysis and trends',
      icon: TrendingUp,
      color: 'bg-green-500',
      data: {
        totalSales: 125000,
        totalOrders: 620,
        avgOrderValue: 201,
        growth: '+15.2%'
      }
    },
    {
      id: 'inventory',
      name: 'Inventory Report',
      description: 'Stock levels and movement analysis',
      icon: Package,
      color: 'bg-blue-500',
      data: {
        totalItems: 156,
        lowStock: 8,
        outOfStock: 2,
        turnoverRate: '2.3x'
      }
    },
    {
      id: 'customer',
      name: 'Customer Report',
      description: 'Customer behavior and analytics',
      icon: Users,
      color: 'bg-purple-500',
      data: {
        totalCustomers: 175,
        newCustomers: 28,
        repeatRate: '68%',
        avgSpending: 714
      }
    },
    {
      id: 'financial',
      name: 'Financial Report',
      description: 'Profit, loss and financial summary',
      icon: IndianRupee,
      color: 'bg-orange-500',
      data: {
        revenue: 125000,
        expenses: 85000,
        profit: 40000,
        margin: '32%'
      }
    },
    {
      id: 'tax',
      name: 'Tax Report',
      description: 'GST and tax compliance reports',
      icon: FileText,
      color: 'bg-red-500',
      data: {
        gstCollected: 15000,
        gstPaid: 8500,
        netGst: 6500,
        compliance: '100%'
      }
    }
  ]

  const quickReports = [
    { name: 'Daily Sales Summary', period: 'Today', status: 'ready' },
    { name: 'Weekly Inventory Report', period: 'This Week', status: 'generating' },
    { name: 'Monthly Customer Analysis', period: 'This Month', status: 'ready' },
    { name: 'Quarterly Financial Report', period: 'Q2 2024', status: 'ready' },
    { name: 'Annual Tax Summary', period: '2024', status: 'scheduled' }
  ]

  const exportFormats = [
    { id: 'pdf', name: 'PDF', icon: FilePdf, description: 'Formatted report' },
    { id: 'excel', name: 'Excel', icon: FileSpreadsheet, description: 'Spreadsheet format' },
    { id: 'csv', name: 'CSV', icon: FileText, description: 'Raw data' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'generating':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const generateReport = (reportId: string) => {
    console.log('Generating report:', reportId)
    // Simulate report generation
  }

  const exportReport = (format: string) => {
    console.log('Exporting report as:', format)
    // Simulate export
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Business Reports
              </CardTitle>
              <CardDescription>Generate comprehensive reports for your {businessType}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="quick">Quick Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Report Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Types */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Report Type</CardTitle>
                  <CardDescription>Choose the type of report you want to generate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTypes.map((report) => {
                      const Icon = report.icon
                      return (
                        <Card
                          key={report.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedReport === report.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedReport(report.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 ${report.color} rounded-lg flex items-center justify-center`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{report.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{report.description}</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {Object.entries(report.data).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                                      <span className="font-medium">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Report Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Time Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Export Format</label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {exportFormats.map((format) => {
                      const Icon = format.icon
                      return (
                        <Button
                          key={format.id}
                          variant="outline"
                          className="justify-start h-auto p-3"
                          onClick={() => exportReport(format.id)}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">{format.name}</div>
                            <div className="text-xs text-gray-500">{format.description}</div>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => generateReport(selectedReport)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Reports</CardTitle>
              <CardDescription>Pre-configured reports ready for download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-gray-500">{report.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      {report.status === 'ready' && (
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Scheduled Reports</CardTitle>
                  <CardDescription>Automate your reporting workflow</CardDescription>
                </div>
                <Button size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  New Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Daily Sales Summary</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Frequency:</span>
                      <p className="font-medium">Daily at 9:00 AM</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Format:</span>
                      <p className="font-medium">PDF</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Recipients:</span>
                      <p className="font-medium">owner@business.com</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Run:</span>
                      <p className="font-medium">Tomorrow 9:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Weekly Inventory Report</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Frequency:</span>
                      <p className="font-medium">Weekly on Monday</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Format:</span>
                      <p className="font-medium">Excel</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Recipients:</span>
                      <p className="font-medium">manager@business.com</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Run:</span>
                      <p className="font-medium">Next Monday 8:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Monthly Financial Report</h4>
                    <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Frequency:</span>
                      <p className="font-medium">Monthly on 1st</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Format:</span>
                      <p className="font-medium">PDF</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Recipients:</span>
                      <p className="font-medium">accounts@business.com</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Run:</span>
                      <p className="font-medium">Next Month 1st</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reports Generated</p>
                    <p className="text-2xl font-bold">247</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Most Popular</p>
                    <p className="text-lg font-bold">Sales Report</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Time Saved</p>
                    <p className="text-2xl font-bold">45h</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span>Sales Reports</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">89 generated</p>
                    <p className="text-sm text-gray-500">36% of total</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-blue-500" />
                    <span>Inventory Reports</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">67 generated</p>
                    <p className="text-sm text-gray-500">27% of total</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span>Customer Reports</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">54 generated</p>
                    <p className="text-sm text-gray-500">22% of total</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <IndianRupee className="w-5 h-5 text-orange-500" />
                    <span>Financial Reports</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">37 generated</p>
                    <p className="text-sm text-gray-500">15% of total</p>
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
