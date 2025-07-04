import { type FC } from "react";

import {
    Checkbox,
    HStack,
    Text,
    VStack,
} from "@yamada-ui/react";

import { FontAwesomeIcon } from "@yamada-ui/fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import type { Payment } from '../hooks/usePayments';

type PaymentItemProps = {
    payment: Payment;
    updatePayment: (id: number, updateData: Partial<Omit<Payment, 'id'>>) => void;
    deletePayment: (id: number) => void;
};

export const PaymentItem: FC<PaymentItemProps> = ({payment, updatePayment, deletePayment }) => {
    const handleCheckChange = (e: React .ChangeEvent<HTMLInputElement>) => {
        updatePayment(payment.id, { isPaid: e.target.checked });
};

    const handleDeleteClick = () => {
        if (window.confirm(`「${payment.userName}」の¥${payment.amount.toLocalString()}のデータを本当に削除しますか？`)) {
            deletePayment(payment.id);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<SVGSVGElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDeleteClick();
        }
    };

    return(
        <HStack
            p="md"
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            spacing="md"
            opacity={payment.isPaid ? 0.6 : 1}
            transition="opacity 0.2s"
        >
            <Checkbox
                size="lg"
                isChecked={payment.isPaid}
                onChange={handleCheckChange}
            />

            <VStack flex="1" align="flex-start" spacing="0">
                <Text fontSize="lg" fontWeight="bold" as={payment.isPaid ? 'del' : 'span'}>
                    {payment.userName}
                </Text>
                <Text color="gray.600">
                    ¥{payment.amount.toLocaleString()}
                </Text>
            </VStack>

            <VStack align="flex-end" spacing="0">
                <Text fontSize="sm" color="gray.500">
                    {payment.paymentMethod}
                </Text>
                <Text fontSize="xs" color="gray.400">
                    {payment.date}
                </Text>
            </VStack>

            <FontAwesomeIcon
                icon={faTrash}
                fontSize="1.2em"
                color="danger"
                cursor="pointer"
                _hover={{ color: "danger-hover" }}
                onClick={handleDeleteClick}
                onKeyPress={handleKeyPress}
                aria-label="削除"
                role="button"
                tabIndex={0}
            />
        </HStack>
    );
};