import { procedure } from '@/server/trpc'

import { zInputUser } from './input'

export const registerRouter = procedure
  .input(zInputUser)
  .mutation(async ({ input, ctx }) => {
    const findUser = await ctx.prisma.user.findUnique({
      where: {
        email: input.email
      }
    })

    if (findUser) {
      throw new Error('Пользователь с таким email уже существует')
    }

    const user = await ctx.prisma.user.create({
      data: {
        ...input
      }
    })

    return user
  })
