'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Bell, AlertTriangle, Info, CheckCircle, CreditCard, Package, Users, MessageSquare, Trash2, BookMarkedIcon as MarkAsRead } from 'lucide-react'

interface NotificationCenterProps {
  notifications: any[]
  onClose: () => void
}

export function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  const [filter, setFilter] = useState('all')

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'payment':
        return 'bg-emerald-50 border-emerald-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Bell className="w-6 h-6 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription>Stay updated with your business activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Filter Tabs */}
        <div className="px-6 pb-4 flex-shrink-0">
          <div className="flex space-x-2">
            {['all', 'warning', 'info', 'success', 'payment'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="capitalize"
              >
                {filterType === 'all' ? 'All' : filterType}
                {filterType === 'all' && (
                  <Badge className="ml-2 h-4 w-4 p-0 text-xs">{notifications.length}</Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications to show</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {notification.module}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <MarkAsRead className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="flex-shrink-0 p-6 border-t bg-gray-50">
          <div className="flex justify-between">
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button variant="outline" size="sm">
              <MarkAsRead className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
