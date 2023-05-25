import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/SliderCard.css";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";

const SliderCard = ({ p }) => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const index = cart.findIndex((element) => {
      if (element.product._id === p._id) {
        return true;
      }

      return false;
    });

    // console.log(index);

    if (index === -1) {
      setCart([...cart, { product: p, quantity: 1 }]);
    } else {
      const newCart = cart.map((e) => {
        if (e.product._id === p._id) {
          return { ...e, quantity: e.quantity + 1 };
        } else {
          return e;
        }
      });
      setCart(newCart);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // console.log(auth);

  // console.log(cart);
  // console.log(p);
  return (
    <>
      <div className="slider-card me-2">
        <div className="card-imgg">
          <img
            src={`/api/v1/product/product-photo/${p._id}`}
            alt={p.name}
            className=""
            onClick={() => {
              navigate(`/product/${p.slug}`);
            }}
          />
        </div>
        <div className="card-bd d-flex flex-column align-items-center">
          <h5
            className="card-titl fs-5 mb-1 ps-2 pe-2"
            onClick={() => {
              navigate(`/product/${p.slug}`);
            }}
          >
            {p.name}
          </h5>
          <span>
            <h5 className="text-success price">
              {p.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
          </span>
          <button className="w-75 bg-info rounded" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default SliderCard;
