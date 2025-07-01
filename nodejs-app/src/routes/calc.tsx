import { createFileRoute } from "@tanstack/react-router"
import React, { useState, useMemo } from 'react';

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
        { id: "clear", label: "AC", handler: handleClear, className: "bg-red-500 hover:bg-red-600 col-span-2" },
        { id: "backspace", label: "⌫", handler: handleBackspace, className: "bg-gray-500 hover:bg-gray-600" },
        { id: "divide", label: "÷", handler: () => handleOperatorClick("/"), className: "bg-orange-500 hover:bg-orange-600" },
        { id: "seven", label: "7", handler: () => handleNumberClick("7") },
        { id: "eight", label: "8", handler: () => handleNumberClick("8") },
        { id: "nine", label: "9", handler: () => handleNumberClick("9") },
        { id: "multiply", label: "×", handler: () => handleOperatorClick("*"), className: "bg-orange-500 hover:bg-orange-600" },
        { id: "four", label: "4", handler: () => handleNumberClick("4") },
        { id: "five", label: "5", handler: () => handleNumberClick("5") },
        { id: "six", label: "6", handler: () => handleNumberClick("6") },
        { id: "subtract", label: "−", handler: () => handleOperatorClick("-"), className: "bg-orange-500 hover:bg-orange-600" },
        { id: "one", label: "1", handler: () => handleNumberClick("1") },
        { id: "two", label: "2", handler: () => handleNumberClick("2") },
        { id: "three", label: "3", handler: () => handleNumberClick("3") },
        { id: "add", label: "+", handler: () => handleOperatorClick("+"), className: "bg-orange-500 hover:bg-orange-600" },
        { id: "zero", label: "0", handler: () => handleNumberClick("0"), className: "col-span-2" },
        { id: "decimal", label: ".", handler: () => handleNumberClick(".") },
        { id: "equals", label: "=", handler: handleCalculate, className: "bg-orange-500 hover:bg-orange-600" },
    ];

    const baseButtonClass = "text-white text-3xl font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-all duration-150 ease-in-out h-20";
    const numberButtonClass = "bg-gray-700 hover:bg-gray-800";

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm mx-auto">
                <div className="flex items-center bg-gray-700 rounded-t-lg px-2 pt-2">
                    {calculators.map((calc, index) => (
                        <div
                            key={calc.id}
                            onClick={() => setActiveTabId(calc.id)}
                            className={`flex items-center cursor-pointer px-4 py-2 border-b-4 ${activeTabId === calc.id ? `border-orange-500 bg-gray-800` : `border-transparent`} rounded-t-md`}
                        >
                            <span className={`mr-2 ${activeTabId === calc.id ? `text-white` : `text-gray-400`}`}>電卓 {index + 1}</span>
                            {calculators.length > 1 && (
                                <button onClick={(e) => closeTab(calc.id, e)} className="text-gray-500 hover:text-white text-lg leading-none">&times;</button>
                            )}
                        </div>
                    ))}
                    <button onClick={addTab} className="ml-2 px-3 py-1 text-2xl text-gray-400 hover:text-white">+</button>
                </div>
                <div className="bg-gray-800 rounded-b-2xl shadow-2xl p-6 space-y-6">
                    <div className="bg-gray-900 rounded-lg p-4 text-right break-words">
                        <div className="text-gray-400 text-2xl h-8">{activeCalculator?.history || ""}</div>
                        <div id="display" className="text-white text-5xl font-bold h-14">{activeCalculator?.input || "0"}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {buttons.map(btn => (
                            <button
                                key={btn.id}
                                id={btn.id}
                                onClick={btn.handler}
                                className={`${baseButtonClass} ${btn.className || numberButtonClass}`}
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

//ルートの定義
export const Route = createFileRoute('/calc')({
    component: CalculatorTabs,
});