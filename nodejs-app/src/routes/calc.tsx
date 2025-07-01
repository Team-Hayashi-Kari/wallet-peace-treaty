import { createFileRoute } from "@tanstack/react-router"
import React, { useState, useMemo } from 'react';
import './calc.css';

// ボタンのプロパティに対する型定義
interface ButtonProps {
    id: string;
    label: string | JSX.Element;
    handler: () => void;
    className?: string;
}

// 各電卓インスタンスの状態を表す型定義
interface CalculatorState {
    id: number;
    input: string;
    history: string;
}

// メインの電卓コンポーネント
const CalculatorTabs: React.FC = () => {
    // 複数の電卓の状態を管理する配列
    const [calculators, setCalculators] = useState<CalculatorState[]>([
        { id: 1, input: '0', history: '' },
    ]);
    // 現在アクティブなタブのIDを管理
    const [activeTabId, setActiveTabId] = useState<number>(1);
    // 新しいタブに割り振るための一意なIDを管理
    const [nextId, setNextId] = useState<number>(2);

    // アクティブな電卓の状態をメモ化して取得
    const activeCalculator = useMemo(
        () => calculators.find(c => c.id === activeTabId),
        [calculators, activeTabId]
    );

    // 電卓の状態を更新するヘルパー関数
    const updateActiveCalculator = (newState: Partial<CalculatorState>): void => {
        setCalculators(currentCalculators =>
            currentCalculators.map(c =>
                c.id === activeTabId ? { ...c, ...newState } : c
            )
        );
    };

    // 新しいタブ（電卓）を追加する処理
    const addTab = (): void => {
        const newCalculator: CalculatorState = { id: nextId, input: '0', history: '' };
        setCalculators([...calculators, newCalculator]);
        setActiveTabId(nextId);
        setNextId(prevId => prevId + 1);
    };

    // タブを閉じる処理
    const closeTab = (idToClose: number, event: React.MouseEvent): void => {
        event.stopPropagation();

        if (calculators.length <= 1) return;

        const newCalculators = calculators.filter(c => c.id !== idToClose);
        setCalculators(newCalculators);

        // 閉じたタブがアクティブだった場合、残っているタブの最初のものをアクティブにする
        if (activeTabId === idToClose) {
            setActiveTabId(newCalculators[0].id);
        }
    };


    //以下計算ロジック

    const handleNumberClick = (value: string): void => {
        if (!activeCalculator) return;
        const currentInput = activeCalculator.input;
        if (currentInput.includes("エラー")) {
            updateActiveCalculator({ input: value });
            return;
        }
        if (value === "." && currentInput.includes(".")) return;

        const newInput = currentInput === "0" && value !== "." ? value : currentInput + value;
        updateActiveCalculator({ input: newInput });
    };

    const handleOperatorClick = (operator: string): void => {
        if (!activeCalculator || activeCalculator.input.includes("エラー")) return;
        const lastChar = activeCalculator.input.slice(-1);
        const newInput = ['+', '-', '*', '/'].includes(lastChar)
            ? activeCalculator.input.slice(0, -1) + operator
            : activeCalculator.input + operator;

        updateActiveCalculator({ input: newInput });
    };

    const handleBackspace = (): void => {
        if (!activeCalculator) return;

        if (activeCalculator.input.includes("エラー")) {
            updateActiveCalculator({ input: "0" });
            return;
        }

        const newPrevInput = activeCalculator.input.slice(0, -1);
        updateActiveCalculator({ input: newPrevInput === "" ? "0" : newPrevInput });
    };

    const handleClear = (): void => {
        updateActiveCalculator({ input: "0", history: "" });
    };

    const handleCalculate = (): void => {
        if (!activeCalculator || activeCalculator.input.includes("エラー")) return;

        try {
            const sanitizedExpression = activeCalculator.input.replace(/[^-()\d/*+.]/g, '');
            const result = new Function('(`use strict`;return (${sanitizedExpression})`)')();

            if (typeof result !== 'number' || !isFinite(result)) {
                throw new Error("無効な計算結果です。");
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

    // ボタンの定義
        const buttons: ButtonProps[] = [
        { id: "clear", label: "AC", handler: handleClear, className: "btn--special btn--wide" },
        { id: "backspace", label: "⌫", handler: handleBackspace, className: "btn--special" },
        { id: "divide", label: "÷", handler: () => handleOperatorClick("/"), className: "btn--operator" },
        { id: "seven", label: "7", handler: () => handleNumberClick("7") },
        { id: "eight", label: "8", handler: () => handleNumberClick("8") },
        { id: "nine", label: "9", handler: () => handleNumberClick("9") },
        { id: "multiply", label: "×", handler: () => handleOperatorClick("*"), className: "btn--operator" },
        { id: "four", label: "4", handler: () => handleNumberClick("4") },
        { id: "five", label: "5", handler: () => handleNumberClick("5") },
        { id: "six", label: "6", handler: () => handleNumberClick("6") },
        { id: "subtract", label: "−", handler: () => handleOperatorClick("-"), className: "btn--operator" },
        { id: "one", label: "1", handler: () => handleNumberClick("1") },
        { id: "two", label: "2", handler: () => handleNumberClick("2") },
        { id: "three", label: "3", handler: () => handleNumberClick("3") },
        { id: "add", label: "+", handler: () => handleOperatorClick("+"), className: "btn--operator" },
        { id: "zero", label: "0", handler: () => handleNumberClick("0"), className: "btn--wide" },
        { id: "decimal", label: ".", handler: () => handleNumberClick(".") },
        { id: "equals", label: "=", handler: handleCalculate, className: "btn--operator" },
    ];

    return (
        <div className="calculator-app">
            <div className="calculator-wrapper">
                <div className="tabs-container">
                    {calculators.map((calc, index) => (
                        <div
                            key={calc.id}
                            onClick={() => setActiveTabId(calc.id)}
                            className={`tab ${activeTabId === calc.id ? 'tab--active' : ''}`}
                        >
                            <span className="tab-label">電卓 {index + 1}</span>
                            {calculators.length > 1 && (
                                <button onClick={(e) => closeTab(calc.id, e)} className="tab-close-btn">&times;</button>
                            )}
                        </div>
                    ))}
                    <button onClick={addTab} className="tab-add-btn">+</button>
                </div>
                <div className="calculator-body">
                    <div className="display">
                        <div className="display-history">{activeCalculator?.history || ""}</div>
                        <div id="display" className="display-input">{activeCalculator?.input || "0"}</div>
                    </div>
                    <div className="buttons-grid">
                        {buttons.map(btn => (
                            <button
                                key={btn.id}
                                id={btn.id}
                                onClick={btn.handler}
                                className={`btn ${btn.className || ''}`}
                                disabled={!activeCalculator}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorTabs;

export const Route = createFileRoute('/calc')({
    component: CalculatorTabs,
});