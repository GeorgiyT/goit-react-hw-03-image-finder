import React from "react";
import PropTypes from "prop-types";

const Modal = ({ image, text, clickFunk }) => {
  return (
    <div className="Overlay" onClick={clickFunk}>
      <div className="Modal">
        <img src={image} alt={text} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  clickFunk: PropTypes.func.isRequired
};

export default Modal;
