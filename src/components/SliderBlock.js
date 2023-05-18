import React from "react";
import CardSlider from "./CardSlider";
import "./styles/SliderBlock.css";

const SliderBlock = () => {
  return (
    <div className="sliderBlock d-flex align-items-center bg-dark">
      <div className="h-100 tagg flex-fill">Tag</div>
      <CardSlider />
    </div>
  );
};

export default SliderBlock;
