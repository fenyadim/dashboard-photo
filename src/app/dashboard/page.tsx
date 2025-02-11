import { logoutAction } from '@/features/authForm/actions/logout'
import { Button } from '@/shared/ui'

import { trpcServer } from '../_trpc/server'

const DashboardRoute = async () => {
  const data = await trpcServer.welcomeProtected()
  console.log(data)

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={logoutAction}>Logout</Button>
    </div>
  )
}

export default DashboardRoute
