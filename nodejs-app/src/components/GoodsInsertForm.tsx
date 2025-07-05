/** @jsxImportSource @emotion/react */
import { type FC, useState } from "react"; // useState をインポート
import {
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
} from "@yamada-ui/react";

// Goods 型は共通で利用されると仮定
type Goods = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

type GoodsComponentProps = {
  keyMax: number; // 現在の最大のID (新しい商品のIDとして使う)
  setGoods: React.Dispatch<React.SetStateAction<Goods[]>>;
};

const GoodsComponent: FC<GoodsComponentProps> = ({ keyMax, setGoods }) => {
  // フォームの入力値を管理するためのstate
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
	const [amount, setAmount] = useState<string>('');

  // バリデーションエラーの状態を管理
  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
  const [isPriceInvalid, setIsPriceInvalid] = useState<boolean>(false);
	const [isAmountInvalid, setIsAmountInvalid] = useState<boolean>(false);

	const addGoods = (newGoods: Goods) => {
		setGoods((prevGoods) => [...prevGoods, newGoods]);
	};

  // 「決定」ボタンが押された時のハンドラ
  const handleSubmit = () => {
    let isValid = true;
    const priceValue = Number(price);
		const amountValue = Number(amount);

		setIsNameInvalid(isNameInvalid);
		setIsPriceInvalid(isPriceInvalid);
		setIsAmountInvalid(isAmountInvalid);
		// 入力値のバリデーションを行う
		// 商品名が空でないかチェック
		if (name.trim() === '') {
			setIsNameInvalid(true);
			isValid = false;
		}
		else {
			setIsNameInvalid(false);
		}
		// 価格のバリデーションチェック
		if (isNaN(priceValue) || price.trim() === '' || priceValue <= 0) {
			setIsPriceInvalid(true);
			isValid = false;
		} else {
			setIsPriceInvalid(false);
		}
		// 個数のバリデーションチェック
		if (isNaN(amountValue) || amount.trim() === '' || amountValue <= 0) {
			setIsAmountInvalid(true);
			isValid = false;
		} else {
			setIsAmountInvalid(false);
		}
    // 全ての入力が有効な場合のみ、商品を追加
    if (isValid) {
      const newGoods: Goods = {
        id: keyMax + 1, // 現在の最大IDに1を足して新しいIDとする
        name: name.trim(),
        price: priceValue,
				amount: amountValue,
      };
      addGoods(newGoods); // 親コンポーネントに新しい商品データを渡す

      // フォームをリセット
      setName('');
      setPrice('');
			setAmount('');
    }
  };

  return (
    <VStack border={"1px solid #000000"} p="md" rounded="lg">
			{/* 商品入力 */}
      <FormControl
				invalid={isNameInvalid}
        label="商品名"
        errorMessage="商品名は必須です"
      >
        <Input
          type="text"
          placeholder="商品名"
          value={name} // 入力値とstateをバインド
          onChange={(e) => {
						setName(e.target.value);
					}} // 入力値の変更をstateに反映
        />
      </FormControl>
			<HStack alignItems={"flex-start"}>
			{/* 価格 */}
      <FormControl
				invalid={isPriceInvalid}
        label="価格"
        errorMessage="価格は必須です"
      >
        <Input
          type="number" // 数字キーボードが出やすいように type="number" のまま
					placeholder="300"
          value={price} // 入力値とstateをバインド
          onChange={(e) => setPrice(e.target.value)} // 入力値の変更をstateに反映
        />
      </FormControl>
			{/* 個数 */}
      <FormControl
				invalid={isAmountInvalid}
        label="個数"
        errorMessage="個数は必須です"
				width={'auto'}
      >
        <Input
          type="number" // 数字キーボードが出やすいように type="number" のまま
					placeholder="1"
          value={amount} // 入力値とstateをバインド
          onChange={(e) => setAmount(e.target.value)} // 入力値の変更をstateに反映
					width={"50px"}
        />
      </FormControl>
			</HStack>

      <Button type="submit" colorScheme="primary" onClick={handleSubmit}>決定</Button>
    </VStack>
  );
};

export default GoodsComponent;