import React from "react";

const Display = ({ content, partialResult }) => {
  return (
    <div>
      <textarea readOnly className="display" value={content} wrap="off" />
      <p className="preview">{partialResult}</p>
    </div>
  );
};

export default Display;
