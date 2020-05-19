import React, { Component } from "react";
import Display from "./display";
import CalculatorBody from "./calculatorBody";
import { evaluate } from "mathjs";
import {
  lastNumberIndex,
  hasDecimalPoint,
  isSymbol,
  countOpenBrackets,
} from "../utils/calculatorUtils";

class Calculator extends Component {
  state = {
    exp: "",
    hasError: false,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  handleAppend = (button) => {
    let { exp } = this.state;

    if (button === "." && hasDecimalPoint(exp)) return;
    if ((!exp || exp === "-") && "+*/^".includes(button)) return;

    const lastChar = exp.charAt(exp.length - 1);
    if (isSymbol(button) && isSymbol(lastChar)) exp = exp.slice(0, -1);

    this.setState({ exp: exp + button, hasError: false });
  };

  handleKeyPress = ({ key }) => {
    if (key === "c") this.handleClear();
    else if (key === "Backspace") this.handleDelete();
    else if (key === "Enter") this.handleCalculation();
    else if ("1234567890,+-/*^".includes(key)) this.handleAppend(key);
  };

  handleBrackets = () => {
    let { exp } = this.state;
    let lastChar = exp[exp.length - 1];

    if (lastChar === ".") return;
    else if (!exp || lastChar === "(" || isSymbol(lastChar)) exp += "(";
    else if (lastChar === ")" && countOpenBrackets(exp) > 0) exp += ")";
    else if (countOpenBrackets(exp) === 0) exp += "*(";
    else exp += ")";

    this.setState({ exp, hasError: false });
  };

  handleSignChange = () => {
    const { exp } = this.state;

    if (!exp || lastNumberIndex(exp) > 1) return;

    const newExp = exp[0] === "-" ? exp.slice(1) : `-${exp}`;
    this.setState({ exp: newExp, hasError: false });
  };

  handleCalculation = () => {
    try {
      this.setState({
        exp: evaluate(this.state.exp).toString(),
      });
    } catch (error) {
      return this.setState({ hasError: true });
    }
  };

  partialResult = () => {
    try {
      return evaluate(this.state.exp).toString();
    } catch (error) {
      return this.state.hasError ? "Invalid syntax" : "";
    }
  };

  handleClear = () => {
    this.setState({ exp: "", hasError: false });
  };

  handleDelete = () => {
    this.setState({ exp: this.state.exp.slice(0, -1), hasError: false });
  };

  render() {
    return (
      <main className="calculator">
        <Display
          content={this.state.exp}
          partialResult={
            lastNumberIndex(this.state.exp) > 0 ? this.partialResult() : ""
          }
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
