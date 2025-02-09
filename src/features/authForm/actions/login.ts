'use server'

import { api } from '@/app/_trpc/serverClient'
import { updateSession } from '@/shared/lib/session'
import { redirect } from 'next/navigation'

import { FormStateLogin, loginSchema } from '../model/loginSchema'

export const loginAction = async (
  state: FormStateLogin,
  formData: FormData
): Promise<FormStateLogin> => {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const validatedFields = loginSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'error',
      data: rawData
    }
  }

  const { email, password } = validatedFields.data

  try {
    const user = await api.user.login.query({
      email,
      password
    })
    await updateSession(user.refreshToken)
  } catch (e) {
    return {
      message: (e as Error).message,
      status: 'error',
      data: rawData
    }
  }

  redirect('/')
}
