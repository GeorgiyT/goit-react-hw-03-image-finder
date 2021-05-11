import React from "react";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ webformatURL, queryName, clickFunk }) => {
  return (
    <li className="ImageGalleryItem" onClick={clickFunk}>
      <img src={webformatURL} alt={queryName} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  queryName: PropTypes.string.isRequired,
  clickFunk: PropTypes.func.isRequired
};

export default ImageGalleryItem;
