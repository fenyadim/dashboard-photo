'use server'

import { api } from '@/app/_trpc/serverClient'
import { createSession } from '@/shared/lib/session'
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
    const findUser = await api.user.findOne.query(email)

    if (findUser) {
      return {
        errors: {
          email: ['Пользователь с таким email уже существует']
        },
        data: rawData
      }
    }

    const hashedPassword = await hash(password, 10)
    const user = await api.user.create.mutate({
      fullName,
      email,
      password: hashedPassword
    })
    await createSession(user.id)
  } catch (e) {
    return {
      status: 'error',
      message: 'Что-то пошло не так. Попробуйте еще раз',
      data: rawData
    }
  }

  redirect('/')
}
