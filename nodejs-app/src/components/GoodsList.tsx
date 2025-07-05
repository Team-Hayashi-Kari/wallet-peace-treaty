/** @jsxImportSource @emotion/react */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@yamada-ui/fontawesome';
import { Box, For, HStack, IconButton, Spacer, VStack } from '@yamada-ui/react'
import { type FC } from 'react'

type Goods = {
	id: number;
	name: string;
	price: number;
	amount: number;
}

type GoodsListProps = {
  goods: Goods[];
	setGoods: React.Dispatch<React.SetStateAction<Goods[]>>;
};

const GoodsList: FC<GoodsListProps> = ({ goods, setGoods }) => {
	const handleDelete = (id: number) => {
		setGoods(prevGoods => prevGoods.filter(item => item.id !== id));
	};
	return (
		<VStack p="md" rounded="md" marginBottom={'auto'}>
			<For each={goods}>
				{item => (
					<HStack key={item.id} w="100%" justifyContent="flex-start" p="md" borderBottom="1px solid #e2e8f0">
						<IconButton
							icon={<FontAwesomeIcon icon={faTrash}/>}
							onClick={handleDelete.bind(null, item.id)}
						/>
						<Box>
							{item.name}
						</Box>
						<Spacer />
						<Box>{item.price} 円 x {item.amount ?? 1}</Box>
					</HStack>
				)}
			</For>
		</VStack>
	)
}

export default GoodsList