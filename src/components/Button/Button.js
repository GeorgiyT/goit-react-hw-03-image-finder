import React from "react";

const Button = ({ clickFunction }) => {
  return (
    <button type="button" className="Button" onClick={clickFunction}>
      Load More
    </button>
  );
};

export default Button;
