/** @jsxImportSource @emotion/react */
import { createFileRoute } from "@tanstack/react-router";
// import { css } from '@emotion/react'
import {
  Box,
  Grid,
  GridItem,
  Heading,
} from "@yamada-ui/react";

import GoodsInsertForm from "@components/GoodsInsertForm";
import GoodsList from "@components/GoodsList";

export const Route = createFileRoute("/settlement")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box p="md" rounded="md" bg="white" maxW={{ base: '90%', md: '600px'}} mx="auto">
      <Heading as="h2" size="xl" mb="lg" textAlign="center">
        Our Products
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(1, 1fr)",
        }}
        // gap="lg"
      >
				<GridItem shadow="lg" p="lg" rounded="lg">
					<GoodsList />
					<GoodsInsertForm />
				</GridItem>
				<GridItem shadow="lg" p="lg" rounded="lg">
				</GridItem>
      </Grid>
    </Box>
  );
}
