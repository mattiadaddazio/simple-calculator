import React from "react";

const Button = ({ label, output, onClick }) => {
  return (
    <button
      style={{ width: "50px", height: "50px" }}
      onClick={() => onClick(output)}
    >
      {label}
    </button>
  );
};

export default Button;
