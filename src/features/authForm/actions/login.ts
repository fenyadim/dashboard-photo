'use server'

import { api } from '@/app/_trpc/serverClient'
import { createSession } from '@/shared/lib/session'
import { compareSync } from 'bcryptjs'
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
    const findUser = await api.user.findOne.query(email)

    if (!findUser) {
      return {
        errors: {
          email: [
            'Пользователь не найден. Пожалуйста, проверьте введенные данные'
          ]
        },
        data: rawData
      }
    }

    if (!compareSync(password, findUser.password)) {
      return {
        errors: {
          password: ['Неверный пароль. Пожалуйста, проверьте введенные данные']
        },
        data: rawData
      }
    }

    await createSession(findUser.id)
  } catch (e) {
    return {
      message: 'Что-то пошло не так. Попробуйте еще раз',
      status: 'error',
      data: rawData
    }
  }

  redirect('/')
}
