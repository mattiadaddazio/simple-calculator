import React from "react";
import { FiDelete } from "react-icons/fi";
import { TiPlus, TiMinus, TiDivide, TiTimes, TiEquals } from "react-icons/ti";

const CalculatorBody = (props) => {
  const {
    onAppend,
    onBrackets,
    onSignChange,
    onCalculation,
    onClear,
    onDelete,
  } = props;
  return (
    <table className="calculatorBody">
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td className="delete">
            <FiDelete className="clickable" onClick={onDelete} />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4">
            <hr />
          </td>
        </tr>
        <tr>
          <td>
            <button className="functional font-weight-bold" onClick={onClear}>
              C
            </button>
          </td>
          <td>
            <button
              className="functional font-weight-bold"
              onClick={onBrackets}
            >
              ( )
            </button>
          </td>
          <td>
            <button
              className="functional font-weight-bold"
              onClick={() => onAppend("^")}
            >
              ^
            </button>
          </td>
          <td>
            <button className="functional pb-1" onClick={() => onAppend("/")}>
              <TiDivide />
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => onAppend("7")}>7</button>
          </td>
          <td>
            <button onClick={() => onAppend("8")}>8</button>
          </td>
          <td>
            <button onClick={() => onAppend("9")}>9</button>
          </td>
          <td>
            <button className="functional pb-1" onClick={() => onAppend("*")}>
              <TiTimes />
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => onAppend("4")}>4</button>
          </td>
          <td>
            <button onClick={() => onAppend("5")}>5</button>
          </td>
          <td>
            <button onClick={() => onAppend("6")}>6</button>
          </td>
          <td>
            <button className="functional pb-1" onClick={() => onAppend("-")}>
              <TiMinus />
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => onAppend("1")}>1</button>
          </td>
          <td>
            <button onClick={() => onAppend("2")}>2</button>
          </td>
          <td>
            <button onClick={() => onAppend("3")}>3</button>
          </td>
          <td>
            <button className="functional pb-1" onClick={() => onAppend("+")}>
              <TiPlus />
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button
              className="functional font-weight-bold pb-1"
              onClick={onSignChange}
            >
              +/-
            </button>
          </td>
          <td>
            <button onClick={() => onAppend("0")}>0</button>
          </td>
          <td>
            <button
              className="functional font-weight-bold"
              onClick={() => onAppend(".")}
            >
              ,
            </button>
          </td>
          <td>
            <button className="result pb-1" onClick={onCalculation}>
              <TiEquals />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CalculatorBody;
