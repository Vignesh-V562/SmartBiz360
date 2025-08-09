'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mic, MicOff, X, Volume2, Languages, Play, Square } from 'lucide-react'

interface VoiceInputProps {
  onClose: () => void
}

export function VoiceInput({ onClose }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [confidence, setConfidence] = useState(0)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ]

  const voiceCommands = [
    { command: 'Create new bill', action: 'billing', example: 'नया बिल बनाएं' },
    { command: 'Check stock', action: 'inventory', example: 'स्टॉक चेक करें' },
    { command: 'Add customer', action: 'crm', example: 'नया ग्राहक जोड़ें' },
    { command: 'Show sales report', action: 'analytics', example: 'बिक्री रिपोर्ट दिखाएं' }
  ]

  const startListening = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('Create new bill for customer Rajesh Kumar')
      setConfidence(0.95)
    }, 2000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const executeCommand = () => {
    // Process the voice command
    console.log('Executing command:', transcript)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isListening ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {isListening ? (
                  <Mic className="w-6 h-6 text-red-600" />
                ) : (
                  <MicOff className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">Voice Assistant</CardTitle>
                <CardDescription>
                  {isListening ? 'Listening...' : 'Ready to listen'}
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Select Language:</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="justify-start"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Visualization */}
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-red-100 border-4 border-red-300 animate-pulse' 
                : 'bg-blue-100 border-4 border-blue-300'
            }`}>
              {isListening ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-8 bg-red-500 rounded animate-bounce"></div>
                  <div className="w-2 h-12 bg-red-500 rounded animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-6 bg-red-500 rounded animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-10 bg-red-500 rounded animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              ) : (
                <Mic className="w-12 h-12 text-blue-600" />
              )}
            </div>
            
            {isListening && (
              <p className="text-sm text-gray-600 mt-2">Speak now...</p>
            )}
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Transcript:</p>
                <Badge variant="secondary">
                  {Math.round(confidence * 100)}% confident
                </Badge>
              </div>
              <p className="text-sm">{transcript}</p>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex space-x-2">
            {!isListening ? (
              <Button onClick={startListening} className="flex-1">
                <Mic className="w-4 h-4 mr-2" />
                Start Listening
              </Button>
            ) : (
              <Button onClick={stopListening} variant="destructive" className="flex-1">
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            )}
            
            {transcript && (
              <Button onClick={executeCommand} variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Execute
              </Button>
            )}
          </div>

          {/* Voice Commands Help */}
          <div>
            <p className="text-sm font-medium mb-2">Try these commands:</p>
            <div className="space-y-2">
              {voiceCommands.map((cmd, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                  <p className="font-medium">"{cmd.command}"</p>
                  <p className="text-gray-600">Hindi: "{cmd.example}"</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
