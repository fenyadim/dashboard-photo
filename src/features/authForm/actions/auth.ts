import { api } from '@/app/_trpc/serverClient'
import { createSession } from '@/shared/lib/session'
import { hash } from 'bcryptjs'
import { FormState, registrationSchema } from '../model/validationSchema'

export const registerAction = async (state: FormState, formData: FormData) => {
  const data = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string
  }

  const validatedFields = registrationSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { fullName, email, password } = validatedFields.data

  const hashedPassword = await hash(password, 10)

  try {
    const user = await api.user.createUser.mutate({
      fullName,
      email,
      password: hashedPassword
    })
    await createSession(user.id)
  } catch (e) {
    return {
      errors: {
        email: ['Пользователь с таким email уже существует']
      }
    }
  }
}
