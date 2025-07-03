// src/components/Calculator/CalcButton.tsx
import React from 'react';
import type { ButtonProps } from '@types/index';

/** 個々のボタンコンポーネント */
const CalcButton: React.FC<ButtonProps> = ({ id, label, handler, className = '', value }) => (
    <button
        id={id}
        onClick={() => handler(value)}
        className={`btn ${className}`}
    >
        {label}
    </button>
);

export default CalcButton;