import { z } from 'zod'

export const zInputUser = z.object({
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
