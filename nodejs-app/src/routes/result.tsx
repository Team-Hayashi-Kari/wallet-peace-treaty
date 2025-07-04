import { createFileRoute } from '@tanstack/react-router';

import { PaymentsPage } from '../pages/PaymentsPage';

export const Route = createFileRoute('/result')({
component: PaymentsPage,
});