import React from "react";
import CardSlider from "./CardSlider";
import "./styles/SliderBlock.css";
import { useNavigate } from "react-router-dom";

const SliderBlock = ({ category, catName,id }) => {
  const navigate = useNavigate();
  return (
    <div className="sliderBlock d-flex align-items-center mb-2">
      <div className="h-100 tagg flex-fill d-flex flex-column align-items-center justify-content-center">
        <div className="text-center fs-3 fw-semibold">{catName}</div>
        <div className="mt-5">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/category/${category}`);
            }}
          >
            View All
          </button>
        </div>
      </div>
      <CardSlider category={category} id={id}/>
    </div>
  );
};

export default SliderBlock;
