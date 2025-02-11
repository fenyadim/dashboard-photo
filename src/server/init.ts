import { TRPCError, initTRPC } from '@trpc/server'
import _ from 'lodash'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { AppContext } from './ctx'

const t = initTRPC.context<AppContext>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null
      }
    }
  }
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      user: _.pick(ctx.user, ['id', 'email', 'role'])
    }
  })
})
