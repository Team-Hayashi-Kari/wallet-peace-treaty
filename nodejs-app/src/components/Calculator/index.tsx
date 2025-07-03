// src/components/Calculator/index.tsx
import React from 'react';
import Display from './Display';
import ButtonsGrid from './ButtonsGrid';

interface CalculatorProps {
    state: CalculatorState;
    handlers: any; // 本来はより厳密な型が良い
    isActive: boolean;
}

/** 各電卓インスタンスの状態を表す型定義 */
export interface CalculatorState {
    id: number;
    input: string;
    history: string;
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