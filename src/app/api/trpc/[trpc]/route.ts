import { createAppContext } from '@/server/ctx'
import { appRouter } from '@/server/routers'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createAppContext,
    onError: (opts) => {
      console.error('Ошибка произошла тут -> ', opts.path)
    }
  })
}
export { handler as GET, handler as POST }
