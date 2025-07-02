/** @jsxImportSource @emotion/react */
import { createFileRoute } from '@tanstack/react-router'
// import { css } from '@emotion/react'
import { Button, FormControl, Stack, UIProvider } from '@yamada-ui/react'
import GoodsComponent from '@components/goodsComponent'

export const Route = createFileRoute('/settlement') ({
  component: RouteComponent,
})

function RouteComponent() {
  return (
		<UIProvider>
			<Stack direction={{ base: 'column', md: 'row' }} >
				<FormControl label='商品名' errorMessage='商品名を入力してください'>
					<input type='text' placeholder='冷たい火山' />
				</FormControl>
				<FormControl label='価格' errorMessage='価格を入力してください'>
					<input type='number' placeholder='価格' />
				</FormControl>
				<Button variant='unstyled'>決定</Button>
			</Stack>
			<GoodsComponent />
			<div>
				<h1>Settlement Page</h1>
				<p>This is the settlement page content.</p>
			</div>
		</UIProvider>
	)
}
