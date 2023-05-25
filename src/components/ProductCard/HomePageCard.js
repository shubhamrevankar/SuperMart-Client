import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import "./styles/HomePageCard.css";

const HomePageCard = ({ p }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <>
      <div className="card" key={p._id}>
        <img
          src={`/api/v1/product/product-photo/${p._id}`}
          className="card-img"
          alt={p.name}
          onClick={() => {
            navigate(`/product/${p.slug}`);
          }}
        />
        <div className="card-body">
          <div className="card-name-price">
            <h5
              className="card-title"
              onClick={() => {
                navigate(`/product/${p.slug}`);
              }}
            >
              {p.name}
            </h5>
            <h5 className="card-title card-price">
              {p.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
          </div>
          <p className="card-text ">{p.description.substring(0, 60)}...</p>
          <div className="card-name-price">
            <button
              className="btn btn-dark"
              onClick={() => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageCard;
