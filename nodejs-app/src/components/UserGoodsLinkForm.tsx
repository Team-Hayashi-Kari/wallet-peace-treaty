/** @jsxImportSource @emotion/react */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@yamada-ui/fontawesome";
import {
	HStack,
	Select,
	Option,
	IconButton,
	FormControl,
	Tag,
	useNotice,
} from "@yamada-ui/react";
import { useState, type FC } from "react";

type Goods = {
	id: number;
	name: string;
	price: number;
	amount?: number;
};

type User = {
	id: number;
	name: string;
	goodsIds: number[];
};

type UserGoodsLinkFormProps = {
	users: User[];
	goods: Goods[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};


const UserGoodsLinkForm: FC<UserGoodsLinkFormProps> = ({
	users,
	goods,
	setUsers,
}) => {
	const notice = useNotice()
	const [selectedUser, setSelectdUser] = useState<string>("");
	const [selectedGoods, setSelectedGoods] = useState<string>("");
	const [selectedUserValid, setSelectedUserValid] = useState<boolean>(false);
	const [selectedGoodsValid, setSelectedGoodsValid] = useState<boolean>(false);
	// const [usersAllGoodsIdList, setUsersAllGoodsIdList] = useState<number[]>([]);

	const handleSubmit = () => {
		// setUsersAllGoodsIdList((users.map((user) => user.goodsIds)).flat());
		// console.log(JSON.stringify(usersAllGoodsIdList, null, 2));
		setSelectedGoodsValid(!selectedGoods);
		setSelectedUserValid(!selectedUser);
		if (!selectedUser || !selectedGoods) {
			return;
		}

		const userId = parseInt(selectedUser);
		const goodsId = parseInt(selectedGoods);

		const userIndex = users.findIndex((user) => user.id === userId);
		if (userIndex === -1) {
			// alert('選択されたユーザーが見つかりません');
			return;
		}

		const goodsIndex = goods.findIndex((item) => item.id === goodsId);
		if (goodsIndex === -1) {
			// alert('選択された商品が見つかりません');
			return;
		}

		const updatedUsers = [...users];
		const usersAllGoodsIdList = (users.map((user) => user.goodsIds)).flat();
		if ( usersAllGoodsIdList.filter((id) => id === goodsId).length < (goods[goodsIndex].amount || 0) ) {
			updatedUsers[userIndex].goodsIds.push(goodsId);
			setUsers(updatedUsers);
			// alert('商品をユーザーに追加しました');
		} else {
			notice({
				title: "既に商品がすべて割り当てられています",
				status: "error",
				isClosable: true,
				duration: 2000,
				placement: "bottom-right",
			})
		}

		// setSelectdUser('');
		// setSelectedGoods('');
	};

	return (
		<HStack shadow="lg" p="lg" rounded="lg" alignItems="flex-start">
			{/* ユーザー選択 */}
			<FormControl
				invalid={selectedUserValid}
				errorMessage="ユーザー名は必須です"
				requiredIndicator={
					<Tag size="sm" colorScheme="red" ms={2}>
						required
					</Tag>
				}
			>
				<Select
					placeholder="ユーザーを選択"
					onChange={(e) => {
						setSelectdUser(e);
						// console.log(e);
					}}
				>
					{users.map((user) => (
						<Option key={user.id} value={`${user.id}`}>
							{user.name}
						</Option>
					))}
				</Select>
			</FormControl>
			{/* 商品選択 */}
			<FormControl
				invalid={selectedGoodsValid}
				errorMessage="商品は必須です"
				requiredIndicator={
					<Tag size="sm" colorScheme="red" ms={2}>
						required
					</Tag>
				}
			>
				<Select
					placeholder="商品を選択"
					invalid={selectedGoodsValid}
					onChange={(e) => {
						setSelectedGoods(e);
						// console.log(e);
					}}
				>
					{goods.map((item) => (
						<Option key={item.id} value={`${item.id}`}>
							{item.name} - {item.price} 円
						</Option>
					))}
				</Select>
			</FormControl>
			<IconButton
				icon={<FontAwesomeIcon icon={faPlus} />}
				onClick={handleSubmit}
			/>
		</HStack>
	);
};

export default UserGoodsLinkForm;
