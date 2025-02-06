import { procedure, router } from '@/server/trpc'
import { z } from 'zod'

import { zInputUser } from './input'

export const userRouter = router({
  create: procedure.input(zInputUser).mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.create({
      data: {
        ...input
      }
    })
    return user
  }),
  findOne: procedure.input(z.string()).query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input
      }
    })
    return user
  })
})
