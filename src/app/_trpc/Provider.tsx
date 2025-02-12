'use client'

import { makeQueryClient } from '@/server/query-client'
import { AppRouter } from '@/server/routers'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { cookies } from 'next/headers'
import { useState } from 'react'
import superjson from 'superjson'

export const trpcClient = createTRPCReact<AppRouter>()

let clientQueryClientSingleton: QueryClient

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient())
}
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
  })()
  return `${base}/api/trpc`
}
export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()
  const [trpc] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          async headers() {
            const accessToken = (await cookies()).get('accessToken')?.value
            return {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` })
            }
          }
        })
      ]
    })
  )
  return (
    <trpcClient.Provider client={trpc} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpcClient.Provider>
  )
}
