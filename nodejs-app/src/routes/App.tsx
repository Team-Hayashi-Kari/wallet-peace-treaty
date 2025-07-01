import React from "react";

import "./App.css";
import NumBtn from "./components/NumBtn";
import OperatorBtn from "./components/OperatorBtn";
import Result from "./components/Result";

const App: React.FC = () => {
return (
    <>
    <div className="result">
        <Result result={"計算結果"} />
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
            <OperatorBtn o={"AC"} />
            </span>
            <span className="equal">
            <OperatorBtn o={"="} />
            </span>
        </div>
        </div>
        <div className="operator">
        <OperatorBtn o={"÷"} />
        <OperatorBtn o={"×"} />
        <OperatorBtn o={"-"} />
        <OperatorBtn o={"+"} />
        </div>
    </div>
    </>
);
};

export default App;