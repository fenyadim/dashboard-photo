import { logoutAction } from '@/features/authForm/actions/logout'
import { Button } from '@/shared/ui'

const DashboardRoute = async () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={logoutAction}>Logout</Button>
    </div>
  )
}

export default DashboardRoute
