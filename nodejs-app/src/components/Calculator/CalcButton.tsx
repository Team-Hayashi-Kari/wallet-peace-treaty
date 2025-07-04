// src/components/Calculator/CalcButton.tsx
import React from 'react';

/** ボタンのプロパティに対する型定義 */
export interface ButtonProps {
    id: string;
    label: string | JSX.Element;
    handler: (value?: string) => void;
    className?: string;
    value?: string;
}

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