import {type FC, useState} from 'react';
import {
    Button,
    FormControl,
    Input,
    VStack,
} from '@yamada-ui/react';

import type {Payment} from '../../hooks/usePayments';

type PaymentFormProps = {
    addPayment: (payment: Omit<Payment, 'id' | 'isPaid'>) => void;
};

export const PaymentForm: FC<PaymentFormProps> = ({addPayment}) => {
    const [userName, setuserName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setpaymentMethod] = useState('');

    const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
    const [isAmountInvalid, setIsAmountInvalid] = useState(false);

    const handleSubmit = () => {
        let isValid = true;
        if (userName.trim() === '') {
            setIsUserNameInvalid(true);
            isValid = false;
        }else {
            setIsUserNameInvalid(false);
        }

        const amountValue = Number(amount);
        if (isNaN(amountValue) || amount.trim() === '' || amountValue <= 0) {
            setIsAmountInvalid(true);
            isValid = false;
        }else {
            setIsAmountInvalid(false);
        }

        if (!isValid) {
            return;
        }

        const newPayment = {
            userName: userName.trim(),
            date: date,
            amount: Number(amount),
            paymentMethod: paymentMethod.trim(),
        }

        addPayment(newPayment);

        setuserName("");
        setDate("");
        setAmount("");
        setPaymentMethod("");
    };

    return (
        <VStack as="from" onSubmit={(e) => {e.preventDefault(); handleSubmit(); }} border="1px solid" borderColor="gray.200" p="md" rounded="md" apacing="md">
            <FormControl
                isIndvalid={isUserNameInvalid}
                label="ユーザー名"
                errorMessage="ユーザー名は必須です"
                isRequired
            >
                <Input
                    type="number"
                    priceholder="3000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </FormControl>

            <FormControl Label="支払い方法">
                <Input
                    placeholder="現金、クレジットカードなど"
                    value={paymentMethod}
                    onChange={(e) => setpPaymentMethod(e.target.value)}
                />
            </FormControl>

            <Button type="submit" colorScheme="blue" alignSelf="flex-end">
                この内容で登録する
            </Button>
        </VStack>
    );
};