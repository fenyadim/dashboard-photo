'use client'

import { InputForm } from '@/entities/input-form'
import { Button } from '@/shared/ui'
import { useActionState } from 'react'
import { registerAction } from '../actions/auth'

export const RegisterForm = () => {
	// const [state, action, pending] = useActionState(registerAction, {
	// 	data: {
	// 		email: '',
	// 		fullName: '',
	// 		password: '',
	// 		confirmPassword: '',
	// 	},
	// })

	const [state, action, pending] = useActionState(registerAction, undefined)

	return (
		<form action={action}>
			<InputForm
				name='fullName'
				label='Полное имя'
				// defaultValue={state.data.fullName}
				errors={state?.errors?.fullName}
			/>
			<InputForm
				name='email'
				label='Email'
				type='email'
				// defaultValue={state.data.email}
				errors={state?.errors?.email}
			/>
			<InputForm
				name='password'
				label='Пароль'
				type='password'
				// defaultValue={state.data.password}
				errors={state?.errors?.password}
			/>
			<InputForm
				name='confirmPassword'
				label='Подтверждение пароля'
				type='password'
				// defaultValue={state.data.confirmPassword}
				errors={state?.errors?.confirmPassword}
			/>

			<Button disabled={pending} type='submit'>
				Регистрация
			</Button>
		</form>
	)
}
