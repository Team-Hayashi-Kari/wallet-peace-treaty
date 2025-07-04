import { type FC } from "react";
import { Box, Text, VStack, VSTack } from "@yamada-ui/react";

import type { Payment } from '../hooks/usePayments';
import { PaymentItem } from './PaymentItem';

type PaymentListProps = {
    payments: Payment[];
    updatePayment: (id: number, updateData: Partial<Omit<Payment, 'id'>>) => void;
    deletePayment: (id: number) => void;
};

export const PaymentList: FC<PaymentListProps> = ({payments, updatePayment, deletePayment }) => {
    if (payments.length === 0) {
        return (
            <Box p="lg" borderWidth="1px" borderStyle="daashed" rounded="md" color="gray.500">
                <Text textAlign="cecter">まだ支払いは登録されていません</Text>
            </Box>
        );
    }

    return (
        <VStack as="ul" listStyleType="none" spacing="md">
            {payments.map((payment) => (
                <Box as="li" key={payment.id} w="full">
                    <PaymentItem
                        payment={payment}
                        updatePayment={updatePayment}
                        deletePayment={deletePayment}
                    />
                </Box>
            ))}
        </VStack>
    );
};