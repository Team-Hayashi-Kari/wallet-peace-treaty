import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useMemo } from 'react';

import {PaymentForm} from '@components/payments/PaymentForm';


export const result = createFileRoute('/result')({
component: RouteComponent,
})
function App() {
return (
    <div>
    <h1>精算アプリ</h1>
        <PaymentForm />
    </div>
);
}

export default result;