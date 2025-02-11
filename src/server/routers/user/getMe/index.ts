import { protectedProcedure } from '@/server/init'

export const getMe = protectedProcedure.query(({ ctx }) => ctx.user)
