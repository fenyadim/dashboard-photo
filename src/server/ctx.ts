import { getSession } from '@/shared/lib/session'
import { PrismaClient } from '@prisma/client'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export const createAppContext = async (opts?: FetchCreateContextFnOptions) => {
  const user = await getSession()
  const prisma = new PrismaClient()

  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
    user: user?.userId ?? null
  }
}

export type AppContext = Awaited<ReturnType<typeof createAppContext>>
