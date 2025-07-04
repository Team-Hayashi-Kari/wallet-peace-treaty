import { type FC, useState } from "react";
import {
    Button,
    FormControl,
    Input,
    VStack,
    Checkbox,
    Tag,
} from "@yamada-ui/react";

type Payment = {
    id: number;
    userName: string;
    date?: string;
    amount: number;
    paymentMethod: string;
    isPaid: boolean;
};

type PaymentFormProps = {
    keyMax: number;
    setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
};

const PaymentForm: FC<PaymentFormProps> = ({ keyMax, setPayments }) => {
    const [userName, setUserName] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isPaid, setIsPaid] = useState(false);

    const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
    const [isAmountInvalid, setIsAmountInvalid] = useState(false);
    const [isPaymentMethodInvalid, setIsPaymentMethodInvalid] = useState(false);

    const addPayment = (newPayment: Payment) => {
    setPayments((prevPayments) => [...prevPayments, newPayment]);
    };

    const handleSubmit = () => {
    let isValid = true;

    if (userName.trim() === "") {
        setIsUserNameInvalid(true);
        isValid = false;
    } else {
        setIsUserNameInvalid(false);
    }

    const amountValue = Number(amount);
    if (isNaN(amountValue) || amount.trim() === "" || amountValue <= 0) {
        setIsAmountInvalid(true);
        isValid = false;
    } else {
        setIsAmountInvalid(false);
    }

    if (paymentMethod.trim() === "") {
        setIsPaymentMethodInvalid(true);
        isValid = false;
    }else {
        setIsPaymentMethodInvalid(false);
    }

    if (isValid) {
        const newPayment: Payment = {
        id: keyMax + 1,
        userName: userName.trim(),
        date: date,
        amount: Number(amount),
        paymentMethod: paymentMethod.trim(),
        isPaid: isPaid,
        };
        addPayment(newPayment);

      // フォームをリセット
        setUserName("");
        setDate("");
        setAmount("");
        setPaymentMethod("");
        setIsPaid(false);
    }
    };

    return (
    <VStack border={"1px solid"} borderColor="gray.200" p="md" rounded="md" spacing="md">
        <FormControl
        isInvalid={isUserNameInvalid}
        label="ユーザー名"
        errorMessage="ユーザー名を入力してください"
        isRequired
        >
        <Input
            type="text"
            placeholder="山田 太郎"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />
        </FormControl>

        <FormControl label="日付">
        <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
        </FormControl>

        <FormControl
        isInvalid={isAmountInvalid}
        label="金額"
        errorMessage="0より大きい金額を数値で入力してください"
        isRequired
        >
        <Input
            type="number"
            placeholder="3000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        </FormControl>

        <FormControl
        isInvalid={isPaymentMethodInvalid}
        label="支払い方法"
        errorMessage="支払い方法を入力してください"
        isRequired
        >
        <Input
            type="text"
            placeholder="現金"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
        />
        </FormControl>

        <Checkbox
        isChecked={isPaid}
        onChange={(e) => setIsPaid(e.target.checked)}
        >
        支払済
        </Checkbox>

        <Button colorScheme="primary" onClick={handleSubmit}>
        登録する
        </Button>
    </VStack>
    );
};

export default PaymentForm;