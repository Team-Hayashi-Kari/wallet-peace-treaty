import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { UIProvider } from '@yamada-ui/react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
            <UIProvider>
                <Outlet />
            </UIProvider>
    </React.Fragment>
  )
}
