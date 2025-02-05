import { initTRPC } from '@trpc/server'

interface Meta {
	span: string
}

export const t = initTRPC.meta<Meta>().create()

export const router = t.router
export const procedure = t.procedure
