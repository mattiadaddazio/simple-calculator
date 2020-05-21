import React, { Component } from "react";
import Display from "./display";
import CalculatorBody from "./calculatorBody";
import { evaluate } from "mathjs";
import {
  lastNumberIndex,
  hasDecimalPoint,
  isSymbol,
  isNumber,
  countOpenBrackets,
} from "../utils/calculatorUtils";

class Calculator extends Component {
  state = {
    exp: "",
    hasError: false,
    isResult: false,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = ({ key }) => {
    if (key === "c") this.handleClear();
    else if (key === "Backspace") this.handleDelete();
    else if (key === "Enter") this.handleCalculation();
    else if ("1234567890,+-/*^".includes(key)) this.handleAppend(key);
  };

  handleAppend = (button) => {
    let { exp } = this.state;
    const lastChar = exp.charAt(exp.length - 1);

    if (button === "." && hasDecimalPoint(exp)) return;
    if ((!exp || exp === "-" || lastChar === "(") && "+*/^".includes(button))
      return;

    if (isSymbol(button) && isSymbol(lastChar)) exp = exp.slice(0, -1);

    if (this.state.isResult && isNumber(button))
      return this.setState({ exp: button, hasError: false, isResult: false });

    this.setState({ exp: exp + button, hasError: false, isResult: false });
  };

  handleBrackets = () => {
    let { exp } = this.state;
    let lastChar = exp[exp.length - 1];

    if (lastChar === ".") return;
    else if (!exp || lastChar === "(" || isSymbol(lastChar)) exp += "(";
    else if (lastChar === ")" && countOpenBrackets(exp) > 0) exp += ")";
    else if (countOpenBrackets(exp) === 0) exp += "*(";
    else exp += ")";

    this.setState({ exp, hasError: false, isResult: false });
  };

  handleSignChange = () => {
    const { exp } = this.state;

    if (!exp || lastNumberIndex(exp) > 1) return;

    const newExp = exp[0] === "-" ? exp.slice(1) : `-${exp}`;
    this.setState({ exp: newExp, hasError: false, isResult: false });
  };

  handleCalculation = () => {
    try {
      this.setState({
        exp: evaluate(this.state.exp).toString(),
        isResult: true,
      });
    } catch (error) {
      return this.setState({ hasError: true });
    }
  };

  partialResult = () => {
    try {
      const partialResult = evaluate(this.state.exp).toString();
      return partialResult.includes("e") && this.state.isResult
        ? ""
        : partialResult;
    } catch (error) {
      return this.state.hasError ? "Invalid syntax" : "";
    }
  };

  handleClear = () => {
    this.setState({ exp: "", hasError: false, isResult: false });
  };

  handleDelete = () => {
    this.setState({
      exp: this.state.exp.slice(0, -1),
      hasError: false,
      isResult: false,
    });
  };

  render() {
    const { exp } = this.state;

    return (
      <main className="calculator">
        <Display
          content={exp}
          partialResult={lastNumberIndex(exp) > 0 ? this.partialResult() : ""}
        />
        <CalculatorBody
          onAppend={this.handleAppend}
          onBrackets={this.handleBrackets}
          onSignChange={this.handleSignChange}
          onCalculation={this.handleCalculation}
          onClear={this.handleClear}
          onDelete={this.handleDelete}
        />
      </main>
    );
  }
}

export default Calculator;
