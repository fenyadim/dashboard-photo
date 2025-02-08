import { procedure } from '@/server/trpc'
import { updateSession } from '@/shared/lib/session'
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

    await updateSession(findUser.refreshToken)

    return true
  })
