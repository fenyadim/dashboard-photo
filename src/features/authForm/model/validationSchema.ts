import { z } from 'zod'

export const registrationSchema = z
	.object({
		fullName: z
			.string()
			.min(2, { message: 'Поле должно содержать минимум 2 символа' })
			.trim(),
		email: z.string().email({ message: 'Некорректный email' }).trim(),
		password: z
			.string()
			.min(8, { message: 'Пароль должен содержать минимум 8 символов' })
			.trim(),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type FormState =
	| {
			errors?: {
				fullName?: string[]
				email?: string[]
				password?: string[]
				confirmPassword?: string[]
			}
			message?: string
	  }
	| undefined
