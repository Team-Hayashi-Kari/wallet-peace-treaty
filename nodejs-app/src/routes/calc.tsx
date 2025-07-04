// src/routes/calc.tsx
import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useMemo } from 'react';

// スタイルシートとコンポーネントをインポート
import './calc.css';
import Calculator from '@components/Calculator';
import Tabs from '@components/Tabs';

/** 各電卓インスタンスの状態を表す型定義 */
export interface CalculatorState {
    id: number;
    input: string;
    history: string;
}

// 電卓アプリケーションのメインコンポーネント
const CalculatorApp: React.FC = () => {
    const [calculators, setCalculators] = useState<CalculatorState[]>([
        { id: 1, input: '0', history: '' },
    ]);
    const [activeTabId, setActiveTabId] = useState<number>(1);
    const [nextId, setNextId] = useState<number>(2);

    const activeCalculator = useMemo(
        () => calculators.find(c => c.id === activeTabId)!,
        [calculators, activeTabId]
    );

    const updateActiveCalculator = (newState: Partial<Omit<CalculatorState, 'id'>>) => {
        setCalculators(current =>
            current.map(c => (c.id === activeTabId ? { ...c, ...newState } : c))
        );
    };

    // --- タブ操作ロジック ---
    const addTab = () => {
        const newCalculator: CalculatorState = { id: nextId, input: '0', history: '' };
        setCalculators([...calculators, newCalculator]);
        setActiveTabId(nextId);
        setNextId(prevId => prevId + 1);
    };

    const closeTab = (idToClose: number, event: React.MouseEvent) => {
        event.stopPropagation();
        if (calculators.length <= 1) return;
        const newCalculators = calculators.filter(c => c.id !== idToClose);
        setCalculators(newCalculators);
        if (activeTabId === idToClose) {
            setActiveTabId(newCalculators[0].id);
        }
    };

    // --- 計算ロジック ---
    const handleNumberClick = (value: string) => {
        const currentInput = activeCalculator.input;
        if (currentInput.includes("エラー")) {
            updateActiveCalculator({ input: value });
            return;
        }
        if (value === "." && currentInput.includes(".")) return;
        const newInput = currentInput === "0" && value !== "." ? value : currentInput + value;
        updateActiveCalculator({ input: newInput });
    };

    const handleOperatorClick = (operator: string) => {
        if (activeCalculator.input.includes("エラー")) return;
        const lastChar = activeCalculator.input.slice(-1);
        const newInput = ['+', '-', '*', '/'].includes(lastChar)
            ? activeCalculator.input.slice(0, -1) + operator
            : activeCalculator.input + operator;
        updateActiveCalculator({ input: newInput });
    };

    const handleBackspace = () => {
        if (activeCalculator.input.includes("エラー")) {
            updateActiveCalculator({ input: "0" });
            return;
        }
        const newPrevInput = activeCalculator.input.slice(0, -1);
        updateActiveCalculator({ input: newPrevInput === "" ? "0" : newPrevInput });
    };

    const handleClear = () => {
        updateActiveCalculator({ input: "0", history: "" });
    };

    const handleCalculate = () => {
        if (activeCalculator.input.includes("エラー")) return;
        try {
            const sanitizedExpression = activeCalculator.input.replace(/[^-()\d/*+.]/g, '');
            // eslint-disable-next-line no-new-func
            const result = new Function(`return ${sanitizedExpression}`)();
            if (typeof result !== 'number' || !isFinite(result)) {
                throw new Error("Invalid calculation result.");
            }
            updateActiveCalculator({
                history: activeCalculator.input + " =",
                input: String(result),
            });
        } catch (error) {
            updateActiveCalculator({
                history: activeCalculator.input + " =",
                input: "エラー",
            });
        }
    };

    const calculationHandlers = {
        handleNumberClick,
        handleOperatorClick,
        handleBackspace,
        handleClear,
        handleCalculate,
    };

    return (
        <div className="calculator-app">
            <div className="calculator-wrapper">
                <Tabs
                    calculators={calculators}
                    activeTabId={activeTabId}
                    onSelectTab={setActiveTabId}
                    onCloseTab={closeTab}
                    onAddTab={addTab}
                />
                {calculators.map(calc => (
                    <Calculator
                        key={calc.id}
                        state={calc}
                        handlers={calculationHandlers}
                        isActive={calc.id === activeTabId}
                    />
                ))}
            </div>
        </div>
    );
};

// ルート定義
export const Route = createFileRoute('/calc')({
    component: CalculatorApp,
});