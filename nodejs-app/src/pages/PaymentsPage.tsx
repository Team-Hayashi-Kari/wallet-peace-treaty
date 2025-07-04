import {Box, Heading, VStack, Divider} from "@yamada-ui/react";

import {usePayments} from '../hooks/usePayments';
import {PaymentForm} from '../components/payments/PaymentForm';
import {PaymentList} from '../components/payments/PaymentList';

export const PaymentsPage = () => {
    const {payments, addPayment, updatePayment, deletePayment} = usePayments();

    return(
        <Box maxW="container.lg" mx="auto" p="md">
            <VStack spacing="lg" align="stretch">
                <Heading as="h1" size="x1" textAlign="center">
                    精算管理モード
                </Heading>

                <PaymentForm addPayment={addPayment} />
                <Divider />

                <PaymentList
                payments={payments}
                updatePayment={updatePayment}
                deletePayment={deletePayment}
                />
            </VStack>
        </Box>
    )
}