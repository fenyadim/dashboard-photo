'use server'

import { api } from '@/app/_trpc/serverClient'
import { hash } from 'bcryptjs'
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
    const hashedPassword = await hash(password, 10)
    await api.user.register.mutate({
      fullName,
      email,
      password: hashedPassword
    })
  } catch (e) {
    return {
      status: 'error',
      message: (e as Error).message,
      data: rawData
    }
  }

  redirect('/')
}
