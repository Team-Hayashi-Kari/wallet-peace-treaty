/** @jsxImportSource @emotion/react */
import { createFileRoute } from "@tanstack/react-router";
// import { css } from '@emotion/react'
import {
  Box,
  Grid,
  GridItem,
  Heading,
	VStack,
} from "@yamada-ui/react";

import GoodsInsertForm from "@components/GoodsInsertForm";
import GoodsList from "@components/GoodsList";
import { useState } from "react";
import AddUserForm from "@components/AddUserForm";
import ProductAssignment from "@components/ProductAssignment";
import UserGoodsLinkForm from "@components/UserGoodsLinkForm";

export const Route = createFileRoute("/settlement")({
  component: RouteComponent,
});

type Goods = {
	id: number;
	name: string;
	price: number;
	amount: number;
}

type User = {
	id: number;
	name: string;
	goodsIds: number[];
}

function RouteComponent() {
	// test code
	const [goods, setGoods] = useState<Goods[]>([{id: 1, name: 'ルーム代', price: 490, amount: 2}, {id: 2, name: 'ルーム代割引', price: -100, amount: 1}, {id: 3, name: '冷たい火山', price: 360, amount: 1}, {id: 4, name: 'ポテト', price: 290, amount: 1}]);
	const [users, setUsers] = useState<User[]>([{id: 1, name: 'ユーザーA', goodsIds: [1, 2, 3]}, {id: 1, name: 'ユーザーB', goodsIds: [1]}]);
	// const [goods, setGoods] = useState<Goods[]>([]);
	// const [users, setUsers] = useState<User[]>([]);

  return (
    <Box p="md" rounded="md" mx="auto">
      <Heading as="h2" size="xl" mb="lg" textAlign="center">
        後から清算
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(1, 1fr)",
        }}
        gap="md"
      >
				<VStack shadow="lg" p="lg" rounded="lg" justifyContent='space-between' bg="white">
					<GoodsList goods={goods} setGoods={setGoods} />
					<GoodsInsertForm goods={goods} setGoods={setGoods}/>
				</VStack>
				<GridItem shadow="lg" p="lg" rounded="lg" bg="white">
					<AddUserForm users={users} setUsers={setUsers}/>
					<UserGoodsLinkForm users={users} goods={goods} setUsers={setUsers} />
					<ProductAssignment users={users} goods={goods} setGoods={setGoods} setUsers={setUsers} />
				</GridItem>
      </Grid>
    </Box>
  );
}
