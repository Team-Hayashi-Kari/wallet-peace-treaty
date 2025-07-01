/** @jsxImportSource @emotion/react */
import { createFileRoute } from '@tanstack/react-router'
import { css } from '@emotion/react'
import { UIProvider } from '@yamada-ui/react'
// import goodsComponent from './components/goodsComponent'

export const Route = createFileRoute('/settlement')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
		<UIProvider>
			{/* <goodsComponent /> */}
			<div>
				<h1>Settlement Page</h1>
				<p>This is the settlement page content.</p>
			</div>
		</UIProvider>
	)
}
