/** @jsxImportSource @emotion/react */
import { Box, For, HStack, Select, VStack } from '@yamada-ui/react'
import { FontAwesomeIcon } from "@yamada-ui/fontawesome"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { type FC } from 'react'

const GoodsList: FC = () => {
	const goods = [
		{id: 1, name: '冷たい火山', price: 300, amount: 4, payer: 1},
		{id: 2, name: '冷たい火山', price: 300, amount: 3, payer: 1},
		{id: 3, name: '冷たい火山', price: 300, amount: 2, payer: 1},
		{id: 4, name: '冷たい火山', price: 300, amount: 1, payer: 1},
	]
	const user = [
		{id: 1, name: 'ユーザーA'},
		{id: 2, name: 'ユーザーB'},
	]
	return (
		<VStack p="md" rounded="md">
			<For each={goods}>
				{item => (
					<HStack key={item.id} w="100%" justifyContent="space-between" p="md" borderBottom="1px solid #e2e8f0">
						<Select iconProps={faPerson}></Select>
						<Box>
							{item.name}
						</Box>
						<Box>
							{item.amount ?? 1} 個 × {item.price} 円
						</Box>
					</HStack>
				)}
			</For>
		</VStack>
	)
}

export default GoodsList