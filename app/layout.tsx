import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://smartbiz360.com'), // change to your real domain
  title: 'SmartBiz360',
  description: 'SmartBiz360 is a voice-enabled, AI-powered business toolkit for MSMEs, offering billing, inventory, CRM, and AI insights with multilingual and offline support.',
  generator: 'SmartBiz360 Development',
  icons: {
    icon: '/logo.jpg',
  },
  openGraph: {
    title: 'SmartBiz360',
    description: 'Empowering MSMEs with AI-powered, voice-enabled business tools.',
    images: ['/logo.jpg'],
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
