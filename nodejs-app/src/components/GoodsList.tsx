/** @jsxImportSource @emotion/react */
import { Box, For, HStack, VStack } from '@yamada-ui/react'
import { type FC } from 'react'

type Goods = {
	id: number;
	name: string;
	price: number;
	amount?: number;
	payer?: number;
}

type GoodsListProps = {
  goods: Goods[];
};

const GoodsList: FC<GoodsListProps> = ({ goods }) => {
	return (
		<VStack p="md" rounded="md">
			<For each={goods}>
				{item => (
					<HStack key={item.id} w="100%" justifyContent="space-between" p="md" borderBottom="1px solid #e2e8f0">
						<Box>
							{item.name}
						</Box>
						<Box>{item.price} 円 x {item.amount ?? 1}</Box>
					</HStack>
				)}
			</For>
		</VStack>
	)
}

export default GoodsList