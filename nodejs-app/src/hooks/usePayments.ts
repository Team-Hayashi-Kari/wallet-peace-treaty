import {useState, useEffect, useCallback} from 'react';

export type Payment = {
    id: number;
    userName: string;
    date?: string;
    amount: number;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
};

const STORAGE_KEY = 'payment-app-data';

export const usePayments = () => {
    const [payments, setPayments] =useState<Payment[]>(()=>{
        try{
            const savedData = localStorage.getItem(STORAGE_KEY);
            return savedData ? JSON.parse(savedData) : [];
        }catch (error) {
            console.error('支払データの解析に失敗しました:', error);
            return [];
        }
    });

    useEffect(() => {
        try{
            const dataToSave = JSON.stringify(payments);
            localStorage.setItem(STORAGE_KEY, dataToSave);
        }catch (error) {
            console.error('支払データの保存に失敗しました:', error);
        }
    }, [payments]);

    const addPayment = useCallback((newPayment: Omit<Payment, 'id' | 'isPaid'>) => {
        setPayments((prevPayments) => {
            const newID = prevPayments.length > 0 ? Math.max(...prevPayments.map(p => p.id))+ 1 : 1;
            const paymentToAdd: Payment = {
                ...newPayment,
                id: newID,
                isPaid: false
            };
            return [...prevPayments, paymentToAdd];
        });
    } , []);

    const updatePayment = useCallback((id: number, updateData: Partial<Omit<Payment, 'id'>>) => {
    setPayments((prevPayments) =>
        prevPayments.map((payment) =>
        payment.id === id ? { ...payment, ...updateData } : payment
        )
    );
    }, []);

    const deletePayment = useCallback((id: number) => {
    setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.id !== id)
    );
    }, []);

    return {
        payments,
        addPayment,
        updatePayment,
        deletePayment,
    };
};