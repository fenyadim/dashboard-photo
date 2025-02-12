import { logoutAction } from '@/features/authForm/actions/logout'
import { Button } from '@/shared/ui'

import { trpcServer } from '../_trpc/server'

const DashboardRoute = async () => {
  const { me } = await trpcServer.user.getMe()
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={logoutAction}>Logout</Button>
      <p>Email - {me.email}</p>
      <p>Id - {me.id}</p>
      <p>Role - {me.role}</p>
    </div>
  )
}

export default DashboardRoute
