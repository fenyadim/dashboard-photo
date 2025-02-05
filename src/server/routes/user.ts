import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { procedure, router } from '../trpc'

const prisma = new PrismaClient()

const inputRegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Поле должно содержать минимум 2 символа' })
    .trim(),
  email: z.string().email({ message: 'Некорректный email' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .trim()
})

export const userRouter = router({
  createUser: procedure
    .input(inputRegisterSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          ...input
        }
      })
      return user
    })
})
