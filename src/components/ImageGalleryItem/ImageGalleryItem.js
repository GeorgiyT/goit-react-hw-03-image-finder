import React from "react";

const ImageGalleryItem = ({ webformatURL, queryName }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt={queryName} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
