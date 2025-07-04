// src/components/Tabs.tsx
import React from 'react';

/** 各電卓インスタンスの状態を表す型定義 */
export interface CalculatorState {
    id: number;
    input: string;
    history: string;
}

interface TabsProps {
    calculators: CalculatorState[];
    activeTabId: number;
    onSelectTab: (id: number) => void;
    onCloseTab: (id: number, event: React.MouseEvent) => void;
    onAddTab: () => void;
}

//タブ表示と操作を行うコンポーネント
const Tabs: React.FC<TabsProps> = ({ calculators, activeTabId, onSelectTab, onCloseTab, onAddTab }) => (
    <div className="tabs-container">
        {calculators.map((calc, index) => (
            <div
                key={calc.id}
                onClick={() => onSelectTab(calc.id)}
                className={`tab ${activeTabId === calc.id ? 'tab--active' : ''}`}
            >
                <span className="tab-label">電卓 {index + 1}</span>
                {calculators.length > 1 && (
                    <button onClick={(e) => onCloseTab(calc.id, e)} className="tab-close-btn">&times;</button>
                )}
            </div>
        ))}
        <button onClick={onAddTab} className="tab-add-btn">+</button>
    </div>
);

export default Tabs;