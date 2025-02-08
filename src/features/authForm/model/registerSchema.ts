import { zInputUser } from '@/server/routers/user/register/input'
import { z } from 'zod'

import { FormState } from '../types'

export const registrationSchema = zInputUser
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  })

export type FormStateRegister = FormState<typeof registrationSchema>
