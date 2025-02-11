import { publicProcedure } from '@/server/init'
import { hashSync } from 'bcryptjs'

import { zInputUser } from './input'

export const registerRouter = publicProcedure
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
        password: hashSync(input.password, 10)
      }
    })

    return user
  })
