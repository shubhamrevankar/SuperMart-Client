import React, { useEffect, useState } from "react";
import SliderCard from "./ProductCard/SliderCard.js";
import "./styles/CardSlider.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import axios from "axios";

const CardSlider = ({ category, id }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);

  let box = document.querySelector(`.id-${id}`);

  const btnpressprev = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
    // console.log(width);
  };

  const btnpressnext = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
    // console.log(width);
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${category}`
      );
      // console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // console.log(products);

  return (
    <div className="containerr h-100">
      <div className="carouselcontainerr d-flex h-100">
        <div className="controlsL">
          <button className="con rounded-end-3" onClick={btnpressprev}>
            <FaAngleLeft size={"40px"} />
          </button>
        </div>
        <div className={`product-carousel id-${id}`}>
          <div className="product-container">
            {products.map((p) => {
              return <SliderCard key={p._id} p={p} />;
            })}
          </div>
        </div>
        <div className="controlsR">
          <button className="con rounded-start-3" onClick={btnpressnext}>
            <FaAngleRight size={"40px"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
