import { type FC, useState } from 'react';
import { Button, FormControl, Select, Option, Input, VStack } from '@yamada-ui/react';

import type { Payment } from '../../hooks/usePayments';

type PaymentFormProps = {
addPayment: (payment: Omit<Payment, 'id' | 'isPaid'>) => void;
};

export const PaymentForm: FC<PaymentFormProps> = ({ addPayment }) => {
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
    const [isAmountInvalid, setIsAmountInvalid] = useState(false);
    const paymentMethodOptions = [
        '現金',
        'クレジットカード',
        'PayPay',
        'その他'
    ];

    const handleSubmit = () => {
    let isValid = true;
    if (userName.trim() === '') {
        setIsUserNameInvalid(true);
        isValid = false;
    } else {
        setIsUserNameInvalid(false);
    }

    const amountValue = Number(amount);
    if (isNaN(amountValue) || amount.trim() === '' || amountValue <= 0) {
        setIsAmountInvalid(true);
        isValid = false;
    } else {
        setIsAmountInvalid(false);
    }

    if (!isValid) {
        return;
    }

    const newPayment = {
        userName: userName.trim(),
        date: date || new Date().toISOString().split('T')[0],
        amount: Number(amount),
        paymentMethod: paymentMethod || paymentMethodOptions[0],
    };

    addPayment(newPayment);

    setUserName('');
    setDate('');
    setAmount('');
    setPaymentMethod('');
    };

    return (
    <VStack as="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} border="1px solid" borderColor="gray.200" p="md" rounded="md" spacing="md">
        <FormControl
        isInvalid={isUserNameInvalid}
        label="ユーザー名"
        errorMessage="ユーザー名は必須です"
        isRequired
        >
        <Input
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
        errorMessage="金額は必須かつ0より大きい数値で入力してください"
        isRequired
        >
        <Input
            type="number"
            placeholder="3000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        </FormControl>

            <FormControl label="支払い方法">
                <Select
                    placeholder="支払い方法を選択"
                    value={paymentMethod}
                    onChange={(value) => setPaymentMethod(value)}
                >
                    {paymentMethodOptions.map((method) => (
                        <Option key={method} value={method}>
                        {method}
                </Option>
                ))}
                </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" alignSelf="flex-end">
        この内容で登録する
        </Button>
    </VStack>
    );
};