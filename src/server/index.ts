import { loginRouter } from './routers/user/login'
import { refreshRouter } from './routers/user/refresh'
import { registerRouter } from './routers/user/register'
import { updateRouter } from './routers/user/update'
import { router } from './trpc'

export const appRouter = router({
  user: {
    register: registerRouter,
    login: loginRouter,
    refresh: refreshRouter,
    update: updateRouter
  }
})

export type AppRouter = typeof appRouter
