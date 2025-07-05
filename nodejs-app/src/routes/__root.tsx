import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { UIProvider } from '@yamada-ui/react'
import { theme } from "@theme/index"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
			<UIProvider theme={theme}>
				<Outlet />
			</UIProvider>
    </React.Fragment>
  )
}