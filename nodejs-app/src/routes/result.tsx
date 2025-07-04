import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useMemo } from 'react';

export const result = createFileRoute('/result')({
component: RouteComponent,
})

function RouteComponent() {
return <div>Hello "/result"!</div>
}

export default result;

export const Route = createFileRoute('/result')({
    component: result,
});