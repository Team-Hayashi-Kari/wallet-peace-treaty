import React from 'react';

/** 計算履歴と現在の入力値を表示するコンポーネント */
const Display: React.FC<{ history: string; input: string }> = ({ history, input }) => (
    <div className="display">
        <div className="display-history">{history || ""}</div>
        <div id="display" className="display-input">{input || "0"}</div>
    </div>
);

export default Display;