import React from "react";
import PropTypes from "prop-types";

const Button = ({ clickFunction }) => {
  return (
    <button type="button" className="Button" onClick={clickFunction}>
      Load More
    </button>
  );
};

Button.propTypes = {
  clickFunction: PropTypes.func.isRequired
};

export default Button;
