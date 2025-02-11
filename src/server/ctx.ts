import { getSession } from '@/shared/lib/session'
import { PrismaClient } from '@prisma/client'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import _ from 'lodash'

export const createAppContext = async (opts?: FetchCreateContextFnOptions) => {
  const user = await getSession()
  const prisma = new PrismaClient()

  let getMe: {} | null = {}

  if (user) {
    getMe = await prisma.user.findUnique({
      where: {
        id: user.userId
      }
    })
  }

  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
    user: _.pick(getMe, ['id', 'email', 'role'])
  }
}

export type AppContext = Awaited<ReturnType<typeof createAppContext>>
