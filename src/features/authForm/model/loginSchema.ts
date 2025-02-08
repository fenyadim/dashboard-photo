import { zInputUser } from '@/server/routers/user/register/input'

import { FormState } from '../types'

export const loginSchema = zInputUser.omit({ fullName: true })

export type FormStateLogin = FormState<typeof loginSchema>
