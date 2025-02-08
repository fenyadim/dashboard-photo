import { procedure } from '@/server/trpc'
import { createSession } from '@/shared/lib/session'

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
        ...input,
        refreshToken: ''
      }
    })

    const { refreshToken } = await createSession(user.id)

    await ctx.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken
      }
    })

    return true
  })
