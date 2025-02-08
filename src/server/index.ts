import { loginRouter } from './routers/user/login'
import { refreshRouter } from './routers/user/refresh'
import { registerRouter } from './routers/user/register'
import { router } from './trpc'

export const appRouter = router({
  user: {
    register: registerRouter,
    login: loginRouter,
    refresh: refreshRouter
  }
})

export type AppRouter = typeof appRouter
