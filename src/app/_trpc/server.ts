import 'server-only'

import { createAppContext } from '@/server/ctx'
import { createCallerFactory } from '@/server/init'
import { makeQueryClient } from '@/server/query-client'
import { appRouter } from '@/server/routers'
import { createHydrationHelpers } from '@trpc/react-query/rsc'
import { cache } from 'react'

export const getQueryClient = cache(makeQueryClient)
const caller = createCallerFactory(appRouter)(createAppContext)
export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient)
