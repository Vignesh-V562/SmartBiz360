'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Building, FileText, Download, Share, CheckCircle, Clock, AlertTriangle, TrendingUp, IndianRupee, Calculator, PieChart, BarChart3, Users, Package } from 'lucide-react'

interface BankLoanSupportProps {
  businessType: string
}

export function BankLoanSupport({ businessType }: BankLoanSupportProps) {
  const [loanAmount, setLoanAmount] = useState('')
  const [loanPurpose, setLoanPurpose] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [generatingReport, setGeneratingReport] = useState(false)

  const businessMetrics = {
    monthlyRevenue: 125000,
    monthlyProfit: 40000,
    profitMargin: 32,
    cashFlow: 25000,
    creditScore: 750,
    businessAge: 24, // months
    gstCompliance: 100,
    bankingHistory: 18 // months
  }

  const loanEligibility = {
    maxAmount: 2500000,
    interestRate: 9.5,
    tenure: 60,
    processingFee: 1.5,
    eligibilityScore: 85
  }

  const supportedBanks = [
    { id: 'sbi', name: 'State Bank of India', rate: 9.25, processing: 1.0, maxAmount: 5000000 },
    { id: 'hdfc', name: 'HDFC Bank', rate: 9.75, processing: 1.5, maxAmount: 3000000 },
    { id: 'icici', name: 'ICICI Bank', rate: 9.50, processing: 1.25, maxAmount: 3500000 },
    { id: 'axis', name: 'Axis Bank', rate: 9.85, processing: 1.75, maxAmount: 2500000 },
    { id: 'kotak', name: 'Kotak Mahindra Bank', rate: 10.25, processing: 2.0, maxAmount: 2000000 },
    { id: 'pnb', name: 'Punjab National Bank', rate: 9.15, processing: 0.75, maxAmount: 4000000 }
  ]

  const requiredDocuments = [
    { name: 'Business Registration Certificate', status: 'available', auto: true },
    { name: 'GST Registration Certificate', status: 'available', auto: true },
    { name: 'Financial Statements (Last 2 Years)', status: 'available', auto: true },
    { name: 'Bank Statements (Last 12 Months)', status: 'available', auto: true },
    { name: 'Income Tax Returns', status: 'available', auto: true },
    { name: 'Cash Flow Projections', status: 'available', auto: true },
    { name: 'Business Plan', status: 'pending', auto: false },
    { name: 'Collateral Documents', status: 'pending', auto: false },
    { name: 'KYC Documents', status: 'available', auto: true },
    { name: 'Audited Balance Sheet', status: 'available', auto: true }
  ]

  const generateLoanReport = async () => {
    setGeneratingReport(true)
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false)
    }, 3000)
  }

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1)
    return Math.round(emi)
  }

  const getEligibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getEligibilityStatus = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Building className="w-6 h-6 mr-2" />
                Bank Loan Support Center
              </CardTitle>
              <CardDescription>
                AI-powered loan application assistance for your {businessType}
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Credit Score: {businessMetrics.creditScore}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Loan Eligibility Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Eligibility Score</p>
                <p className={`text-2xl font-bold ${getEligibilityColor(loanEligibility.eligibilityScore)}`}>
                  {loanEligibility.eligibilityScore}%
                </p>
                <p className="text-xs text-gray-500">{getEligibilityStatus(loanEligibility.eligibilityScore)}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Max Loan Amount</p>
                <p className="text-xl font-bold text-blue-600">₹{(loanEligibility.maxAmount / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-500">Based on financials</p>
              </div>
              <IndianRupee className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Interest Rate</p>
                <p className="text-xl font-bold text-purple-600">{loanEligibility.interestRate}%</p>
                <p className="text-xs text-gray-500">Per annum</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing Time</p>
                <p className="text-xl font-bold text-orange-600">7-10</p>
                <p className="text-xs text-gray-500">Working days</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="eligibility" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="eligibility">Eligibility Check</TabsTrigger>
          <TabsTrigger value="banks">Bank Comparison</TabsTrigger>
          <TabsTrigger value="documents">Auto Documents</TabsTrigger>
          <TabsTrigger value="calculator">EMI Calculator</TabsTrigger>
          <TabsTrigger value="reports">Loan Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="eligibility" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Health Score</CardTitle>
                <CardDescription>AI analysis of your business financials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Revenue</span>
                    <div className="text-right">
                      <span className="font-medium">₹{businessMetrics.monthlyRevenue.toLocaleString()}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profit Margin</span>
                    <div className="text-right">
                      <span className="font-medium">{businessMetrics.profitMargin}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cash Flow</span>
                    <div className="text-right">
                      <span className="font-medium">₹{businessMetrics.cashFlow.toLocaleString()}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GST Compliance</span>
                    <div className="text-right">
                      <span className="font-medium">{businessMetrics.gstCompliance}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Business Age</span>
                    <div className="text-right">
                      <span className="font-medium">{businessMetrics.businessAge} months</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 ml-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overall Eligibility</span>
                    <span className={`font-bold ${getEligibilityColor(loanEligibility.eligibilityScore)}`}>
                      {loanEligibility.eligibilityScore}%
                    </span>
                  </div>
                  <Progress value={loanEligibility.eligibilityScore} className="h-3" />
                  <p className="text-sm text-gray-600 mt-2">
                    {getEligibilityStatus(loanEligibility.eligibilityScore)} - You qualify for most business loans
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Improvement Recommendations</CardTitle>
                <CardDescription>AI suggestions to boost your loan eligibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-green-900">Strong Financial Performance</h5>
                        <p className="text-sm text-green-700">Your profit margin of 32% is excellent and above industry average.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-blue-900">Increase Business Age</h5>
                        <p className="text-sm text-blue-700">Continue operations for 6+ more months to reach the 30-month milestone for better rates.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <BarChart3 className="w-4 h-4 text-purple-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-purple-900">Maintain Growth Trajectory</h5>
                        <p className="text-sm text-purple-700">Your 15.2% monthly growth is impressive. Maintain this for 3+ months.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-orange-900">Diversify Revenue Streams</h5>
                        <p className="text-sm text-orange-700">Consider adding complementary services to reduce dependency on product sales.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="banks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bank Comparison & Recommendations</CardTitle>
              <CardDescription>AI-curated list of best banks for your business profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportedBanks.map((bank, index) => (
                  <div key={bank.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{bank.name}</h4>
                          {index === 0 && <Badge className="text-xs bg-green-100 text-green-800">Recommended</Badge>}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Apply Now
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Interest Rate:</span>
                        <p className="font-medium text-green-600">{bank.rate}% p.a.</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Processing Fee:</span>
                        <p className="font-medium">{bank.processing}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Max Amount:</span>
                        <p className="font-medium">₹{(bank.maxAmount / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Approval Time:</span>
                        <p className="font-medium">7-10 days</p>
                      </div>
                    </div>
                    
                    {index === 0 && (
                      <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-700">
                          <strong>Why recommended:</strong> Lowest interest rate, government bank reliability, and excellent track record with {businessType} businesses.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Auto-Generated Documents</CardTitle>
                  <CardDescription>AI-prepared loan application documents from your business data</CardDescription>
                </div>
                <Button onClick={generateLoanReport} disabled={generatingReport}>
                  {generatingReport ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate All
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        doc.status === 'available' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {doc.status === 'available' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium">{doc.name}</h5>
                        <div className="flex items-center space-x-2">
                          <Badge variant={doc.status === 'available' ? 'default' : 'secondary'} className="text-xs">
                            {doc.status === 'available' ? 'Ready' : 'Pending'}
                          </Badge>
                          {doc.auto && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              Auto-Generated
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {doc.status === 'available' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </>
                      )}
                      {doc.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">📋 Document Preparation Status</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Progress value={80} className="h-2" />
                  </div>
                  <span className="text-sm font-medium text-blue-700">8/10 Ready</span>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  Most documents are auto-generated from your business data. Only 2 documents need manual upload.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  EMI Calculator
                </CardTitle>
                <CardDescription>Calculate your loan EMI and plan your finances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="Enter loan amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    placeholder="9.5"
                    defaultValue="9.5"
                  />
                </div>
                <div>
                  <Label htmlFor="tenure">Tenure (Months)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    placeholder="60"
                    defaultValue="60"
                  />
                </div>
                <div>
                  <Label htmlFor="purpose">Loan Purpose</Label>
                  <Input
                    id="purpose"
                    placeholder="Business expansion, inventory, equipment..."
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                  />
                </div>
                <Button className="w-full">
                  Calculate EMI
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">EMI Breakdown</CardTitle>
                <CardDescription>Detailed loan repayment analysis</CardDescription>
              </CardHeader>
              <CardContent>
                {loanAmount && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Monthly EMI</p>
                        <p className="text-xl font-bold text-blue-800">
                          ₹{calculateEMI(parseInt(loanAmount), 9.5, 60).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600">Total Interest</p>
                        <p className="text-xl font-bold text-green-800">
                          ₹{(calculateEMI(parseInt(loanAmount), 9.5, 60) * 60 - parseInt(loanAmount)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600">Total Amount Payable</p>
                      <p className="text-2xl font-bold text-purple-800">
                        ₹{(calculateEMI(parseInt(loanAmount), 9.5, 60) * 60).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Affordability Check</h4>
                      <div className="flex justify-between text-sm">
                        <span>Monthly EMI:</span>
                        <span>₹{calculateEMI(parseInt(loanAmount), 9.5, 60).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Monthly Profit:</span>
                        <span>₹{businessMetrics.monthlyProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>EMI to Profit Ratio:</span>
                        <span className={
                          (calculateEMI(parseInt(loanAmount), 9.5, 60) / businessMetrics.monthlyProfit) < 0.4 
                            ? 'text-green-600' : 'text-red-600'
                        }>
                          {((calculateEMI(parseInt(loanAmount), 9.5, 60) / businessMetrics.monthlyProfit) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={(calculateEMI(parseInt(loanAmount), 9.5, 60) / businessMetrics.monthlyProfit) * 100} 
                        className="h-2" 
                      />
                      <p className="text-xs text-gray-600">
                        {(calculateEMI(parseInt(loanAmount), 9.5, 60) / businessMetrics.monthlyProfit) < 0.4 
                          ? '✅ Affordable - EMI is within safe limits' 
                          : '⚠️ High EMI - Consider reducing loan amount'}
                      </p>
                    </div>
                  </div>
                )}
                {!loanAmount && (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter loan amount to see EMI breakdown</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Loan Application Reports</CardTitle>
                <CardDescription>AI-generated comprehensive reports for loan applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Business Financial Health Report</h5>
                      <Badge className="bg-green-100 text-green-800">Ready</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Comprehensive analysis of your business financials, cash flow, and profitability trends.
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-3 h-3 mr-1" />
                        Share with Bank
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Business Plan & Projections</h5>
                      <Badge className="bg-green-100 text-green-800">Ready</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      AI-generated business plan with 3-year financial projections and growth strategy.
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-3 h-3 mr-1" />
                        Share with Bank
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Loan Utilization Plan</h5>
                      <Badge className="bg-blue-100 text-blue-800">Generating</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Detailed plan showing how the loan will be utilized and expected ROI.
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        <Clock className="w-3 h-3 mr-1" />
                        Processing...
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Collateral Valuation Report</h5>
                      <Badge variant="outline">Optional</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Professional valuation of business assets and collateral (if applicable).
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Request Valuation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Status Tracker</CardTitle>
                <CardDescription>Track your loan application progress across banks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-blue-900">State Bank of India</h5>
                      <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Application ID:</span>
                        <span className="font-mono">SBI2024001234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Amount:</span>
                        <span>₹15,00,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <span>Document verification in progress</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-xs text-blue-700">Expected decision: 3-5 days</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-green-900">HDFC Bank</h5>
                      <Badge className="bg-green-100 text-green-800">Pre-Approved</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pre-approval Amount:</span>
                        <span>₹12,00,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Interest Rate:</span>
                        <span>9.75% p.a.</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Valid Until:</span>
                        <span>March 15, 2024</span>
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        Accept Pre-Approval
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">ICICI Bank</h5>
                      <Badge variant="outline">Not Applied</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Good match based on your profile. Interest rate: 9.50%
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
