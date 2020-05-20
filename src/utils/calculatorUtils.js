export function lastNumberIndex(exp) {
  return (
    ["/", "*", "-", "+", "^"].reduce((lastIndex, symbol) => {
      return lastIndex > exp.lastIndexOf(symbol)
        ? lastIndex
        : exp.lastIndexOf(symbol);
    }, -1) + 1
  );
}

export function hasDecimalPoint(exp) {
  return exp.substring(lastNumberIndex(exp)).includes(".");
}

export function isSymbol(char) {
  return "/*+-^".includes(char);
}

export function isNumber(char) {
  return "0123456789".includes(char);
}

export function countOpenBrackets(exp) {
  return exp
    .split("")
    .reduce(
      (count, char) =>
        char === "(" ? count + 1 : char === ")" ? count - 1 : count,
      0
    );
}

export function translate(exp) {
  return exp.replace("*", "x").replace("/", "÷").replace(".", ",");
}

export function calculateFontSize(exp, length) {
  return length > 15 ? "2.5vh" : "4vh";
}
