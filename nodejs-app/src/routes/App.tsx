import { createFileRoute } from "@tanstack/react-router"
import React, { useState, useMemo } from 'react';

import "./App.css";
import NumBtn from "./components/NumBtn";
import OperatorBtn from "./components/OperatorBtn";
import Result from "./components/Result";
import Context from "./components/Context";
import {
onClearClick,
onEqualClick,
onDivideClick,
onMultiplyClick,
onPlusClick,
onMinusClick
} from "./reducers";

const App: React.FC = () => {
const { state } = useContext(Context);

return (
    <>
    <div className="result">
        <Result
        result={state.showingResult ? state.resultValue : state.inputValue}
        />
    </div>
    <div className="wrapper">
        <div className="number">
        <div className="numUpper">
            <NumBtn n={7} />
            <NumBtn n={8} />
            <NumBtn n={9} />
        </div>
        <div className="numMiddle">
            <NumBtn n={4} />
            <NumBtn n={5} />
            <NumBtn n={6} />
        </div>
        <div className="numLower">
            <NumBtn n={1} />
            <NumBtn n={2} />
            <NumBtn n={3} />
        </div>
        <div className="zero">
            <NumBtn n={0} />
            <span className="allClear">
            <OperatorBtn o={"AC"} action={onClearClick()} />
            </span>
            <span className="equal">
            <OperatorBtn o={"="} action={onEqualClick()} />
            </span>
        </div>
        </div>
        <div className="operator">
        <OperatorBtn o={"÷"} action={onDivideClick()} />
        <OperatorBtn o={"×"} action={onMultiplyClick()} />
        <OperatorBtn o={"-"} action={onMinusClick()} />
        <OperatorBtn o={"+"} action={onPlusClick()} />
        </div>
    </div>
    </>
);
};

export default CalculatorTabs;

export const Route = createFileRoute('/calc')({component: CalculatorTabs,});