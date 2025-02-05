import { cn } from '@/shared/lib/utils'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Provider from './_trpc/Provider'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard for photographers',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={cn(
					geistSans.variable,
					geistMono.variable,
					'antialiased dark min-h-screen p-5'
				)}
			>
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
