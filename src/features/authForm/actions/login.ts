'use server'

import { trpcServer } from '@/app/_trpc/server'
import { createSession } from '@/shared/lib/session'
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
    const user = await trpcServer.user.login({
      email,
      password
    })
    const { refreshToken } = await createSession({
      userId: user.id,
      role: user.role
    })
    await trpcServer.user.update({
      id: user.id,
      refreshToken: refreshToken
    })
  } catch (e) {
    return {
      message: (e as Error).message,
      status: 'error',
      data: rawData
    }
  }

  redirect('/dashboard')
}
