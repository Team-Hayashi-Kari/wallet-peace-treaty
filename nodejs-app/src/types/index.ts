// src/types/index.ts

/** ボタンのプロパティに対する型定義 */
export interface ButtonProps {
    id: string;
    label: string | JSX.Element;
    handler: (value?: string) => void;
    className?: string;
    value?: string;
}

/** 各電卓インスタンスの状態を表す型定義 */
export interface CalculatorState {
    id: number;
    input: string;
    history: string;
}