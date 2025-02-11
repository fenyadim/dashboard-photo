import { trpcServer } from './_trpc/server'

export default async function Home() {
  const data = await trpcServer.welcomeProtected()

  console.log(data)

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
