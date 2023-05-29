import React, { useEffect, useState } from "react";
import success from "./images/success.png";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Success = () => {
  const [cart, setCart] = useCart();

  const [auth] = useAuth();

  const [flag, setFlag] = useState(false);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.product.price * item.quantity;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const PostOrder = async () => {
    try {
      if (cart && cart.length !== 0) {
        const orderCart = cart?.map((c) => ({
          _id: c?.product?._id,
          name: c?.product?.name,
          category: c?.category?.name,
          price: c?.product?.price,
          orderedquantity: c?.quantity,
        }));
        const quantity = cart?.map((c) => c?.quantity);
        // console.log(orderCart);
        // console.log(auth?.user);
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/orders/add-order`,
          {
            products: orderCart,
            quantity: quantity,
            payment: {
              total: totalPrice(),
              success: true,
            },
            buyer: auth?.user?._id,
          }
        );
        // console.log(data);
        if (data?.ok) {
          localStorage.removeItem("cart");
          setCart([]);
        } else {
          console.log("Error while getting data", data);
        }
      } else {
        console.log("Cart not defined");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("1", cart);
    if (cart) {
      if (flag === false) {
        setFlag(true);
      }
    }
  }, [cart]);

  useEffect(() => {
    console.log("2", cart);
    if (cart) {
      PostOrder();
    }
  }, [flag]);

  return (
    <div
      className="vw-100 vh-100 d-flex flex-column align-items-center"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div className="w-100 d-flex flex-column align-items-center mt-5">
        <span className="text-success fs-1 fw-bolder">Payment successful</span>
        <span className="text-warning fs-3 fw-semibold">
          Your order is in our system
        </span>
        <div style={{ width: "400px" }}>
          <img src={success} alt="Success" />
        </div>
        <div className="btn btn-info mx-auto">
          <Link
            to="/"
            className="underline text-xl underline-offset-4 text-decoration-none text-light"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
