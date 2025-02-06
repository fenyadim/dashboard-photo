import { appRouter } from '@/server'
import { createAppContext } from '@/server/ctx'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createAppContext()
  })

export { handler as GET, handler as POST }
