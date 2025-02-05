import { SignIn } from '@/pages/sign-in'
import { serverClient } from './_trpc/serverClient'

export default async function Home() {
	const hello = await serverClient.hello({ text: 25 })

	return (
		<div>
			<p>{hello.greeting}</p>
			<SignIn />
		</div>
	)
}
