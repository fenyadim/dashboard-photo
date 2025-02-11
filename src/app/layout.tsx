import { cn } from '@/shared/lib/utils'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

import { TRPCProvider } from './_trpc/Provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for photographers'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TRPCProvider>
      <html lang='ru' className='min-h-full h-full'>
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            'antialiased dark p-5 h-full'
          )}
        >
          <div className='flex gap-5'>
            <Link href='/'>Home</Link>
            <Link href='/dashboard'>Dashboard</Link>
          </div>
          {children}
        </body>
      </html>
    </TRPCProvider>
  )
}
