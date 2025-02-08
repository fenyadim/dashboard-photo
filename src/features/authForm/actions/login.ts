'use server'

import { api } from '@/app/_trpc/serverClient'
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
    await api.user.login.query({
      email,
      password
    })
  } catch (e) {
    return {
      message: 'Что-то пошло не так. Попробуйте еще раз',
      status: 'error',
      data: rawData
    }
  }

  redirect('/')
}
