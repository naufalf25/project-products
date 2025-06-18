import PropTypes from "prop-types";
import React from "react";

function ImageButton({ index, sliderRef, activeSlide, image }) {
  return (
    <button
      onClick={() => sliderRef.current.slickGoTo(index)}
      key={index}
      className={`cursor-pointer rounded-xl border-4 p-4 ${activeSlide === index ? "border-orange-600/50" : "border-transparent"}`}
    >
      <img src={image} alt={`image-${index}`} className="w-full" />
    </button>
  );
}

ImageButton.propTypes = {
  index: PropTypes.number.isRequired,
  sliderRef: PropTypes.object.isRequired,
  activeSlide: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ImageButton;
