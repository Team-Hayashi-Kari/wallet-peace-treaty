/** @jsxImportSource @emotion/react */
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@yamada-ui/fontawesome";
import { Box, VStack, For, HStack, IconButton, Separator } from "@yamada-ui/react";
import type { FC } from "react";

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

type ProductAssignmentProps = {
	users: User[];
	goods: Goods[];
	setGoods: React.Dispatch<React.SetStateAction<Goods[]>>;
	setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
};

// type Data = { select: string }

const ProductAssignment: FC<ProductAssignmentProps> = ({
	goods,
	users,
	setGoods,
	setUsers,
}) => {
	// 商品をユーザーからひとつだけ削除する関数
	const removeGoodsFromUser = (userId: number, goodsId: number) => {
		if (setUsers) {
			setUsers((prevUsers) =>
				prevUsers.map((user) => {
					// 該当するユーザーを見つけたら、そのユーザーオブジェクトを更新
					if (user.id === userId) {
						const deleteIndex = user.goodsIds.indexOf(goodsId);
						if (deleteIndex !== -1) {
							// goodsIds を変更した新しいユーザーオブジェクトを生成
							const newGoodsIds = [...user.goodsIds]; // スプレッド構文で新しい配列をコピー
							newGoodsIds.splice(deleteIndex, 1); // コピーした配列から要素を削除
							return { ...user, goodsIds: newGoodsIds }; // 新しい goodsIds を持つ新しいユーザーオブジェクトを返す
						}
					}
					// 該当しないユーザーはそのまま返す
					return user;
				}),
			);
		}
	};
	return (
		<VStack>
			<For each={users}>
				{(user) => (
					<HStack
						key={user.id}
						w="100%"
						justifyContent="space-between"
						p="md"
						borderBottom="1px solid #e2e8f0"
					>
						<Box>{user.name}</Box>
						<Box>
							<For each={[...new Set(user.goodsIds)]}>
								{/* 商品表示部 */}
								{(goodsId) => {
									const item = goods.find((item) => item.id === goodsId);
									const goodsCount = user.goodsIds.filter(
										(item) => item === goodsId,
									).length;
									if (!item) return null;
									return (
										<HStack margin={2} key={item.id}>
											<Box key={goodsId} margin={2}>
												{item?.name || "undefined"} - {item?.price || 0} 円 x {goodsCount ?? 1}
											</Box>
											<IconButton
												icon={<FontAwesomeIcon icon={faDeleteLeft} />}
												onClick={() => removeGoodsFromUser(user.id, item.id)}
											/>
										</HStack>
									);
								}}
							</For>
							<Separator variant={"solid"} />
							<Box textAlign={'center'} mt={2}>
								{/* 合計金額 */}
								{(() => {
									if (user.goodsIds.length === 0) {
										return ""
									}
									else {
										const totalPrice = user.goodsIds.reduce((acc, goodsId) => {
											const item = goods.find((item) => item.id === goodsId);
											if (item) {
												return acc + item.price;
											}
											return acc;
										}, 0);
										return `${totalPrice} 円`;
									}
								})()}
							</Box>
						</Box>
					</HStack>
				)}
			</For>
		</VStack>
	);
};

export default ProductAssignment;
