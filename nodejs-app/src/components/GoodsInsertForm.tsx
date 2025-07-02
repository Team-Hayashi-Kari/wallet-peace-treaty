/** @jsxImportSource @emotion/react */
import { type FC } from "react";
// import { css } from '@emotion/react'
import {
  Button,
  FormControl,
  Input,
  Tag,
	VStack,
} from "@yamada-ui/react";

const GoodsComponent: FC = () => {
  return (
    <VStack border={"1px solid #000000"} p="md" rounded="lg">
      <FormControl
        required
        label="商品名"
        errorMessage="商品名を入力してください"
        requiredIndicator={
          <Tag size="sm" colorScheme="red" ms={2}>
            required
          </Tag>
        }
      >
        <Input type="text" placeholder="冷たい火山" />
      </FormControl>
      <FormControl
        required
        label="価格"
        errorMessage="価格を入力してください"
        requiredIndicator={
          <Tag size="sm" colorScheme="red" ms={2}>
            required
          </Tag>
        }
      >
        <Input type="number" placeholder="価格" />
      </FormControl>
      <Button colorScheme="primary">決定</Button>
    </VStack>
  );
};

export default GoodsComponent;