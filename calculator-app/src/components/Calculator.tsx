import React, { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (/^[0-9/*\-+.]/.test(key)) {
        handleButtonClick(key);
      } else if (key === "Enter") {
        handleCalculate("=");
      } else if (key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  const handleButtonClick = (value: string) => {
    if (input.length < 16) {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleCalculate = (value: string) => {
    if (value === "=") {
      try {
        const calculatedResult = eval(input);
        if (typeof calculatedResult === "number" && !isNaN(calculatedResult)) {
          setResult(calculatedResult.toString());
        } else {
          setResult("Error");
        }
      } catch (error) {
        setResult("Error");
      }
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="calculator">
    <div className="display">
        <input type="text" value={input}  />
        <input type="text" value={result}  />
    </div>
    <div className="buttons">
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("/")}>/</button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("*")}>*</button>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
        <button onClick={() => handleClear()}>C</button>
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={() => handleCalculate("=")}>=</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
      </div>
    </div>
  );
};

export default Calculator;
