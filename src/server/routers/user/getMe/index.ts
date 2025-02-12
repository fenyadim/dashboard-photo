import { protectedProcedure } from '@/server/init'
import _ from 'lodash'

export const getMe = protectedProcedure.query(({ ctx }) => {
  return { me: ctx.user && _.pick(ctx.user, ['id', 'email', 'role']) }
})
