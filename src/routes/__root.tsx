import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AppShell } from '@/components/layout/AppShell'

export const Route = createRootRoute({
  component: () => (
    <>
      <AppShell />
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </>
  ),
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-4 py-28 text-center"><p className="text-sm font-bold tracking-widest text-orange-500 uppercase">404</p><h1 className="font-display mt-3 text-5xl font-bold text-stone-900">This table is empty</h1><p className="mt-4 text-stone-500">The page you were looking for isn't on today's menu.</p><a href="/" className="mt-7 inline-flex rounded-full bg-stone-900 px-6 py-3 font-semibold text-white">Back home</a></div>,
})
