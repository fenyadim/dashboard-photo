import { initTRPC } from '@trpc/server'

import { AppContext } from './ctx'

export const t = initTRPC.context<AppContext>().create()

export const router = t.router
export const procedure = t.procedure
