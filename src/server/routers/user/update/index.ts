import { procedure } from '@/server/trpc'

import { zUpdateInput } from './input'

export const updateRouter = procedure
  .input(zUpdateInput)
  .mutation(async ({ input, ctx }) => {
    const findUser = await ctx.prisma.user.findUnique({
      where: {
        id: input.id
      }
    })

    if (!findUser) {
      throw new Error('Пользователь не найден')
    }

    await ctx.prisma.user.update({
      where: {
        id: findUser.id
      },
      data: {
        ...input
      }
    })

    return true
  })
