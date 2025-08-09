'use client'

import { Badge } from '@/components/ui/badge'
import { Wifi, WifiOff } from 'lucide-react'

interface OfflineIndicatorProps {
  isOnline: boolean
}

export function OfflineIndicator({ isOnline }: OfflineIndicatorProps) {
  if (isOnline) {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <Wifi className="w-3 h-3 mr-1" />
        Online
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
      <WifiOff className="w-3 h-3 mr-1" />
      Offline
    </Badge>
  )
}
