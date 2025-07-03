// src/components/Calculator/index.tsx
import React from 'react';
import type { CalculatorState } from '@types/index';
import Display from './Display';
import ButtonsGrid from './ButtonsGrid';

interface CalculatorProps {
    state: CalculatorState;
    handlers: any; // 本来はより厳密な型が良い
    isActive: boolean;
}

/** 単一の電卓UI（ディスプレイとボタン）コンポーネント */
const Calculator: React.FC<CalculatorProps> = ({ state, handlers, isActive }) => {
    if (!isActive) return null;

    return (
        <div className="calculator-body">
            <Display history={state.history} input={state.input} />
            <ButtonsGrid handlers={handlers} />
        </div>
    );
};

export default Calculator;