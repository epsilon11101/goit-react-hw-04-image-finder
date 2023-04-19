import React from "react";

import classes from "./ImageGalleryItem.module.css";

const ImageGalleryItem = (props) => {
  const { fetchData } = props;

  return fetchData.map((img) => {
    return (
      <img
        key={img.id}
        src={img.webformatURL}
        alt={img.tags}
        data-sorce={img.largeImageURL}
        loading="lazy"
      />
    );
  });
};

export default ImageGalleryItem;
