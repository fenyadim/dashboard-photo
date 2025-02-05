'use client'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@radix-ui/react-label'
import { useActionState } from 'react'
import { registerAction } from '../actions/auth'

export const RegisterForm = () => {
	const [state, action, pending] = useActionState(registerAction, undefined)

	return (
		<form action={action}>
			<div>
				<Label htmlFor='fullName'>Full name</Label>
				<Input id='fullName' name='fullName' placeholder='Name' />
				{state?.errors?.fullName && <p>{state.errors.fullName}</p>}
			</div>
			<div>
				<Label htmlFor='email'>Email</Label>
				<Input id='email' name='email' type='email' placeholder='Email' />
				{state?.errors?.email && <p>{state.errors.email}</p>}
			</div>
			<div>
				<Label htmlFor='password'>Password</Label>
				<Input id='password' name='password' type='password' />
				{state?.errors?.password && <p>{state.errors.password}</p>}
			</div>
			<div>
				<Label htmlFor='confirmPassword'>Confirm password</Label>
				<Input id='confirmPassword' name='confirmPassword' type='password' />
				{state?.errors?.confirmPassword && (
					<p>{state.errors.confirmPassword}</p>
				)}
			</div>
			<Button disabled={pending} type='submit'>
				Sign Up
			</Button>
		</form>
	)
}
