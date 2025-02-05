import { z } from 'zod'
import { procedure, router } from './trpc'

export const appRouter = router({
	hello: procedure
		.input(z.object({ text: z.number() }))
		.query(opts => ({ greeting: `Hello ${opts.input.text}` })),
})

export type AppRouter = typeof appRouter
