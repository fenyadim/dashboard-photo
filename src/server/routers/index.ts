import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init'
import { getMe } from './user/getMe'
import { loginRouter } from './user/login'
import { refreshRouter } from './user/refresh'
import { registerRouter } from './user/register'
import { updateRouter } from './user/update'

export const appRouter = createTRPCRouter({
  user: {
    register: registerRouter,
    login: loginRouter,
    refresh: refreshRouter,
    update: updateRouter,
    getMe: getMe
  },
  welcome: publicProcedure.query(({ ctx }) => {
    console.log(ctx.user)
    return {
      status: 'OK',
      message: 'Welcome'
    }
  }),
  welcomeProtected: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.user)
    return {
      status: 'OK',
      message: 'Welcome protected'
    }
  })
})

export type AppRouter = typeof appRouter
