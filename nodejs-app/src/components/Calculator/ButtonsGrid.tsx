// src/components/Calculator/ButtonsGrid.tsx
import React from 'react';
import { type ButtonProps } from '@types/index';
import CalcButton from './CalcButton';

interface ButtonsGridProps {
    handlers: {
        handleNumberClick: (value: string) => void;
        handleOperatorClick: (value: string) => void;
        handleClear: () => void;
        handleBackspace: () => void;
        handleCalculate: () => void;
    };
}

/** 電卓のボタンをグリッド状に配置するコンポーネント */
const ButtonsGrid: React.FC<ButtonsGridProps> = ({ handlers }) => {
    const { handleNumberClick, handleOperatorClick, handleClear, handleBackspace, handleCalculate } = handlers;

    const buttons: ButtonProps[] = [
        { id: "clear", label: "AC", handler: handleClear, className: "btn--special btn--wide" },
        { id: "backspace", label: "⌫", handler: handleBackspace, className: "btn--special" },
        { id: "divide", label: "÷", handler: handleOperatorClick, value: "/", className: "btn--operator" },
        { id: "seven", label: "7", handler: handleNumberClick, value: "7" },
        { id: "eight", label: "8", handler: handleNumberClick, value: "8" },
        { id: "nine", label: "9", handler: handleNumberClick, value: "9" },
        { id: "multiply", label: "×", handler: handleOperatorClick, value: "*", className: "btn--operator" },
        { id: "four", label: "4", handler: handleNumberClick, value: "4" },
        { id: "five", label: "5", handler: handleNumberClick, value: "5" },
        { id: "six", label: "6", handler: handleNumberClick, value: "6" },
        { id: "subtract", label: "−", handler: handleOperatorClick, value: "-", className: "btn--operator" },
        { id: "one", label: "1", handler: handleNumberClick, value: "1" },
        { id: "two", label: "2", handler: handleNumberClick, value: "2" },
        { id: "three", label: "3", handler: handleNumberClick, value: "3" },
        { id: "add", label: "+", handler: handleOperatorClick, value: "+", className: "btn--operator" },
        { id: "zero", label: "0", handler: handleNumberClick, value: "0", className: "btn--wide" },
        { id: "decimal", label: ".", handler: handleNumberClick, value: "." },
        { id: "equals", label: "=", handler: handleCalculate, className: "btn--operator" },
    ];

    return (
        <div className="buttons-grid">
            {buttons.map(btn => <CalcButton key={btn.id} {...btn} />)}
        </div>
    );
};

export default ButtonsGrid;
