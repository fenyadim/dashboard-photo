import { z } from 'zod'

export const zLoginInput = z.object({
  email: z.string().email({ message: 'Некорректный email' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .trim()
})
