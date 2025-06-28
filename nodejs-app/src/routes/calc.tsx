import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'; // TanStack Routerのインポート

//ルートの定義
export const Route = createFileRoute('/calc')({
  component: RouteComponent,
});

//RouteComponentとして電卓アプリのロジックをラップ
function RouteComponent(): React.ReactElement {
  // 現在の入力値の状態管理 (string型)
  const [input, setInput] = useState<string>("0");
  // 計算結果の状態管理 (number型、エラー時はstring型も許容)
  const [result, setResult] = useState<number | string>(0);

  //数字のボタンがクリックされた時の処理
  const handleNumberClick = (value: string): void => {
    setInput((prevInput: string) => (prevInput === "0" ? value : prevInput + value));
  };

  //四則演算子のボタンがクリックされた時の処理
  const handleOperatorClick = (operator: string): void => {
    if (input !== "0") {
      setInput((prevInput: string) => prevInput + operator);
    }
  };

  //バックスペースのボタンがクリックされた時の処理
  const handleBackspace = (): void => {
    setInput((prevInput: string) => {
      const newPrevInput = prevInput.slice(0, prevInput.length - 1);
      return newPrevInput === "" ? "0" : newPrevInput; // 空になったら"0"に戻す
    });
  };

  //クリアのボタンがクリックされた時の処理
  const handleClear = (): void => {
    setResult(0);
    setInput("0");
  };

  //計算のボタンがクリックされた時の処理
  const handleCalculate = (): void => {
    try {
      const calculatedResult: number = evaluateExpression(input);
      if (Number.isInteger(calculatedResult)) {
        setInput(calculatedResult.toString());
      } else {
        setInput(calculatedResult.toFixed(2));
      }
      setResult(calculatedResult);
    } catch (error: any) {
      setInput("エラー：" + error.message);
      setResult("エラー");
    }
  };

  //自前で四則演算を評価する関数
  const evaluateExpression = (expression: string): number => {
    // 不正な文字を取り除く（数字、演算子、括弧、小数点のみを許可）
    const sanitizedExpression: string = expression.replace(/[^-()\d/*+.]/g, '');

    // 空文字列になった場合は0を返すか、エラーとして処理
    if (sanitizedExpression.trim() === "") {
        return 0;
    }

    try {
      // Functionコンストラクタは文字列をコードとして評価する
      const result: number = Function(`"use strict";return (${sanitizedExpression})`)();

      // 結果が数値であることを確認
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error("計算結果が無効です。");
      }
      return result;
    } catch (error) {
      throw new Error("式の評価中にエラーが発生しました。");
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <h1>電卓 Mode!</h1>
        <div className="input-container">
          <input type="text" value={input} readOnly={true} />
          <button className="backspace-button" onClick={handleBackspace}>⌫</button> {/* バックスペース記号 */}
        </div>

        <div>
          <button onClick={() => handleNumberClick("1")}>1</button>
          <button onClick={() => handleNumberClick("2")}>2</button>
          <button onClick={() => handleNumberClick("3")}>3</button>
          <button className="operator-button" onClick={() => handleOperatorClick("+")}>+</button>
        </div>

        <div>
          <button onClick={() => handleNumberClick("4")}>4</button>
          <button onClick={() => handleNumberClick("5")}>5</button>
          <button onClick={() => handleNumberClick("6")}>6</button>
          <button className="operator-button" onClick={() => handleOperatorClick("-")}>-</button>
        </div>

        <div>
          <button onClick={() => handleNumberClick("7")}>7</button>
          <button onClick={() => handleNumberClick("8")}>8</button>
          <button onClick={() => handleNumberClick("9")}>9</button>
          <button className="operator-button" onClick={() => handleOperatorClick("*")}>*</button>
        </div>

        <div>
          <button onClick={() => handleNumberClick("0")}>0</button>
          <button className="clear-button" onClick={handleClear}>C</button>
          <button className="operator-button" onClick={handleCalculate}>=</button>
          <button className="operator-button" onClick={() => handleOperatorClick("/")}>/</button>
        </div>

        <div>
          <p>結果: {result}</p>
        </div>
      </div>
    </div>
  );
}