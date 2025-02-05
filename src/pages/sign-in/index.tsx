import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export const SignIn = () => {
	return (
		<div>
			<h1>Sign in</h1>
			<form>
				<div>
					<Label htmlFor='name'>Name</Label>
					<Input id='name' name='name' placeholder='Name' />
				</div>
				<div>
					<Label htmlFor='email'>Email</Label>
					<Input id='email' name='email' type='email' placeholder='Email' />
				</div>
				<div>
					<Label htmlFor='password'>Password</Label>
					<Input id='password' name='password' type='password' />
				</div>
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
}
