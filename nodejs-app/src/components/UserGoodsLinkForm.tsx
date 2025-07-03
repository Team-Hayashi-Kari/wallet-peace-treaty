/** @jsxImportSource @emotion/react */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@yamada-ui/fontawesome';
import { HStack, Select, Option, IconButton } from '@yamada-ui/react';
import { useState, type FC } from 'react'

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

type UserGoodsLinkFormProps = {
	users: User[];
	goods: Goods[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserGoodsLinkForm: FC<UserGoodsLinkFormProps> = ({users, goods, setUsers}) => {
	const [selectedUser, setSelectdUser] = useState<string>('');
	const [selectedGoods, setSelectedGoods] = useState<string>('');

	const handleSubmit = () => {
		if (!selectedUser || !selectedGoods) {
			alert('ユーザーと商品を選択してください');
			return;
		}

		const userId = parseInt(selectedUser);
		const goodsId = parseInt(selectedGoods);

		const userIndex = users.findIndex(user => user.id === userId);
		if (userIndex === -1) {
			alert('選択されたユーザーが見つかりません');
			return;
		}

		const goodsIndex = goods.findIndex(item => item.id === goodsId);
		if (goodsIndex === -1) {
			alert('選択された商品が見つかりません');
			return;
		}

		const updatedUsers = [...users];
		if (!updatedUsers[userIndex].goodsIds.includes(goodsId)) {
			updatedUsers[userIndex].goodsIds.push(goodsId);
			setUsers(updatedUsers);
			alert('商品をユーザーに追加しました');
		} else {
			alert('この商品はすでにユーザーに追加されています');
		}
		
		// setSelectdUser('');
		// setSelectedGoods('');
	}

	return (
		<HStack shadow="lg" p="lg" rounded="lg">
			<Select placeholder='ユーザーを選択'
				onChange={(e) => {
					setSelectdUser(e); console.log(e);
				}}>
				{users.map(user => (
					<Option key={user.id} value={`${user.id}`}>{user.name}</Option>
				))}
			</Select>
			<Select
			placeholder='商品を選択'
				onChange={(e) => {
					setSelectedGoods(e); console.log(e);
				}}>
				{goods.map(item => (
					<Option key={item.id} value={`${item.id}`}>{item.name} - {item.price} 円 × {item.amount ?? 1}</Option>
				))}
			</Select>
      <IconButton
        icon={<FontAwesomeIcon icon={faPlus} />}
				onClick={handleSubmit}
      />
		</HStack>
	)
}

export default UserGoodsLinkForm