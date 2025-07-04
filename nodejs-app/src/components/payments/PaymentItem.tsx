import { type FC, KeyboardEvent } from "react";

import {
    Checkbox,
    Grid,
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
        if (window.confirm(`「${payment.userName}」の¥${payment.amount.toLocaleString()}のデータを本当に削除しますか？`)) {
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
        <Grid
            templateColumns="aut 1fr minmax(80px, auto) 110px 100px auto"
            p="md"
            gap="md"
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

            <Text fontSize="lg" fontWeight="bold" as={payment.isPaid ? 'del' : 'span'}>
                {payment.userName}
            </Text>
            <Text color="gray.600">
                ¥{payment.amount.toLocaleString()}
            </Text>

            <Text fontSize="sm" color="gray.500">
                {payment.paymentMethod}
            </Text>

            <Text fontSize="xs" color="gray.400">
                {payment.date}
            </Text>

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
        </Grid>
    );
};