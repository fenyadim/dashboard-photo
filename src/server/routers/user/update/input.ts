import { z } from 'zod'

export const zUpdateInput = z.object({
  id: z.string(),
  email: z.string().email({ message: 'Некорректный email' }).trim().optional(),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .trim()
    .optional(),
  phone: z.string().trim().optional(),
  fullName: z.string().trim().optional(),
  refreshToken: z.string().optional()
})
