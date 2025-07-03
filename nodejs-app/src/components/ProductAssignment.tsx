/** @jsxImportSource @emotion/react */
import { Box, VStack, For, HStack } from '@yamada-ui/react'
import { type FC } from 'react'

type Goods = {
	id: number;
	name: string;
	price: number;
	amount?: number;
}

type User = {
	id: number;
	name: string;
	goodsIds: number[];
}

type ProductAssignmentProps = {
	users: User[];
	goods: Goods[];
	setGoods: React.Dispatch<React.SetStateAction<Goods[]>>;
}

// type Data = { select: string }


const ProductAssignment: FC<ProductAssignmentProps> = ({ goods, users, setGoods }) => {
	return (
		<>
			<VStack>
				<For each={users}>
					{user => (
						<HStack key={user.id} w="100%" justifyContent="space-between" p="md" borderBottom="1px solid #e2e8f0">
							<Box>
								{user.name}
							</Box>
							<Box>
								{goods.filter(item => user.goodsIds.includes(item.id)).map(item => (
									<Box key={item.id}>
										{item.name} - {item.price} 円 × {item.amount ?? 1}
									</Box>
								))}
							</Box>
						</HStack>
					)}
				</For>
			</VStack>
		</>
	)
}

export default ProductAssignment