import { procedure } from '@/server/trpc'
import { compareSync } from 'bcryptjs'

import { zLoginInput } from './input'

export const loginRouter = procedure
  .input(zLoginInput)
  .query(async ({ input, ctx }) => {
    const findUser = await ctx.prisma.user.findUnique({
      where: {
        email: input.email
      }
    })

    if (!findUser) {
      throw new Error('Пользователь не найден')
    }

    if (!compareSync(input.password, findUser.password)) {
      throw new Error('Неверный пароль')
    }

    return findUser
  })
