import { getSession } from '@/shared/lib/session'
import { PrismaClient } from '@prisma/client'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export const createAppContext = async (opts?: FetchCreateContextFnOptions) => {
  const prisma = new PrismaClient()
  const user = await getSession(prisma)

  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
    user
  }
}

export type AppContext = Awaited<ReturnType<typeof createAppContext>>
