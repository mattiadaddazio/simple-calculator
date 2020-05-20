import React from "react";
import { translate, calculateFontSize } from "./../utils/calculatorUtils";

const Display = ({ content, partialResult }) => {
  return (
    <div>
      <textarea
        style={{ fontSize: calculateFontSize(content, content.length) }}
        readOnly
        className="display"
        value={translate(content)}
        wrap="off"
      />
      <p
        style={{
          fontSize: calculateFontSize(partialResult, partialResult.length),
        }}
        className="preview"
      >
        {translate(partialResult)}
      </p>
    </div>
  );
};

export default Display;
