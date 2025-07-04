/** @jsxImportSource @emotion/react */
import { createFileRoute } from "@tanstack/react-router";
// import { css } from '@emotion/react'
import {
  Box,
  Button,
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
	const [goods, setGoods] = useState<Goods[]>([{id: 1, name: '商品A', price: 1000, amount: 2}, {id: 2, name: '商品B', price: 1000, amount: 2}, {id: 3, name: '商品C', price: 1000, amount: 2}]);
	const [users, setUsers] = useState<User[]>([{id: 1, name: 'ユーザーA', goodsIds: []}]);

  return (
    <Box p="md" rounded="md" bg="white" maxW={{ base: '100%', md: '600px'}} mx="auto">
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
				<VStack shadow="lg" p="lg" rounded="lg" alignContent='space-between'>
					<GoodsList goods={goods} />
					<GoodsInsertForm keyMax={Math.max(...goods.map(item => item.id))} setGoods={setGoods}/>
				</VStack>
				<GridItem shadow="lg" p="lg" rounded="lg">
					<AddUserForm users={users} setUsers={setUsers}/>
					<UserGoodsLinkForm users={users} goods={goods} setUsers={setUsers} />
					<ProductAssignment users={users} goods={goods} setGoods={setGoods} setUsers={setUsers} />
				</GridItem>
      </Grid>
    </Box>
  );
}
