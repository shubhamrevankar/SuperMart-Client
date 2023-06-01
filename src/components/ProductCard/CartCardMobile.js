import React, { useEffect } from "react";
import { useCart } from "../../context/cart";
import "./styles/CartCardMobile.css";
import { FaPlusCircle, FaMinusCircle, FaTrash } from "react-icons/fa";

const CartCardMobile = ({ p, q }) => {
  const [cart, setCart] = useCart();

  const handleRemoveCart = () => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.product._id === p._id);
      myCart.splice(index, 1);
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubtractCart = () => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.product._id === p._id);
      if (myCart[index].quantity === 1) {
        myCart.splice(index, 1);
      } else {
        myCart[index].quantity--;
      }
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCart = () => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.product._id === p._id);
      myCart[index].quantity++;
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // console.log(p);
  // console.log(cart);

  return (
    <div className="cart-card-mob m-0 mb-3 w-100 p-2 rounded">
      <div className="cart-img-mob d-flex align-items-center justify-content-center h-75 w-100 position-relative">
        <div className="d-flex justify-content-between position-absolute top-0 end-0">
          <div className="d-flex align-items-start justify-content-end">
            <button className="bg-light text-danger" onClick={handleRemoveCart}>
              <FaTrash size={"20px"} />
            </button>
          </div>
        </div>
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
          className="object-fit-contain"
        />
      </div>
      <div className="ps-2 pe-2 pt-1 w-100 m-0">
        <span className="fs-6 w-100">{p.name}</span>
      </div>
      <div className="w-100 p-2 m-0 d-flex align-items-center justify-content-between">
        <span className="fs-4 text-success fw-semibold">
          {p.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <div className="d-flex align-items-center justify-content-start">
          <button className="bg-light text-danger" onClick={handleSubtractCart}>
            <FaMinusCircle size={"20px"} />
          </button>
          <span className="fs-4 ms-1 me-1">{q}</span>
          <button className="bg-light text-success" onClick={handleAddCart}>
            <FaPlusCircle size={"20px"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCardMobile;
