'use server'

import { trpcServer } from '@/app/_trpc/server'
import { createSession } from '@/shared/lib/session'
import { redirect } from 'next/navigation'

import { FormStateRegister, registrationSchema } from '../model/registerSchema'

export const registerAction = async (
  state: FormStateRegister,
  formData: FormData
): Promise<FormStateRegister> => {
  const rawData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string
  }

  const validatedFields = registrationSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: rawData
    }
  }

  const { fullName, email, password } = validatedFields.data

  try {
    const user = await trpcServer.user.register({
      fullName,
      email,
      password
    })
    const { refreshToken } = await createSession({
      userId: user.id,
      role: user.role
    })
    await trpcServer.user.update({
      id: user.id,
      refreshToken
    })
  } catch (e) {
    return {
      status: 'error',
      message: (e as Error).message,
      data: rawData
    }
  }

  redirect('/dashboard')
}
