import { publicProcedure } from '@/server/init'
import { updateSession } from '@/shared/lib/session'
import { cookies } from 'next/headers'
import { z } from 'zod'

export const refreshRouter = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const findUser = await ctx.prisma.user.findUnique({
      where: {
        id: input
      }
    })

    if (!findUser) {
      return null
    }

    cookies().then(({ get }) => {
      if (findUser.refreshToken === get('refreshToken')?.value) {
        updateSession(findUser.id)
      }
    })
  })
