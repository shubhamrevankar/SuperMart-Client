import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
import "./styles/Cart.css";
import Header_Footer from "../Layout/Header_Footer";
import CartCard from "../components/ProductCard/CartCard";
import CartCardMobile from "../components/ProductCard/CartCardMobile";

const CartPage = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const [cart, setCart] = useCart();

  const [total, setTotal] = useState(0);

  //total price
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

  const format = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  //get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/braintree/token");
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  const getCartTotal = () => {
    let totalQuantity = 0;
    cart?.map((e) => {
      totalQuantity = totalQuantity + e.quantity;
    });
    return totalQuantity;
  };

  useEffect(() => {
    setTotal(totalPrice());
  }, [cart]);

  // console.log(auth);

  const handleCheckout = async () => {
    try {
      // console.log("env", process.env.REACT_APP_STRIPE_PRIVATE_KEY);
      // await axios.post(
      //   "http://localhost:5000/create-checkout-session",
      //   {
      //     items: [
      //       { id: 1, quantity: 3 },
      //       { id: 2, quantity: 1 },
      //     ],
      //   },
      //   {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${process.env.REACT_APP_STRIPE_PRIVATE_KEY}`,
      //   }
      // );

      const cartItems = cart?.map((p) => {
        return {
          id: p.product._id,
          quantity: p.quantity,
          price: p.product.price,
          name: p.product.name,
        };
      });

      fetch(`${process.env.REACT_APP_API}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: [...cartItems],
        }),
      })
        .then(async (res) => {
          if (res.ok) return res.json();
          const json = await res.json();
          return await Promise.reject(json);
        })
        .then(({ url }) => {
          window.location = url;
        })
        .catch((e) => {
          console.log(e.error);
        });

      // navigate("/payment");
      // console.log(url);
    } catch (error) {
      console.log(error);
    }
    // fetch("http://localhost:5000/create-checkout-session", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     items: [
    //       { id: 1, quantity: 3 },
    //       { id: 2, quantity: 1 },
    //     ],
    //   }),
    // })
    //   .then((res) => {
    //     if (res.ok) return res.json();
    //     return res.json().then((json) => Promise.reject(json));
    //   })
    //   .then(({ url }) => {
    //     window.location = url;
    //   })
    //   .catch((e) => {
    //     console.error(e.error);
    //   });
  };

  // console.log(cart);

  return (
    <Header_Footer title={"Cart"}>
      <div className="container mt-4 w-100">
        <div className="container w-80 m-auto row">
          <div className="cartLeft p-0 col-9 d-flex flex-column">
            <div
              className="yourCart d-flex align-items-center justify-content-center mb-3 p-3 w-100"
              style={{ backgroundColor: "white", zIndex: "5" }}
            >
              <span className="fs-1 fw-semibold">Your Cart</span>
            </div>
            <div className="p-4 w-100">
              {cart?.length === 0 ? (
                <div className="w-100 d-flex flex-column align-items-center justify-content-center p-3">
                  <span className="text-secondary mb-3">
                    Your Cart is Empty{" "}
                  </span>
                  <Link to="/" className="text-decoration-none">
                    <button className="btn btn-primary">Explore</button>
                  </Link>
                </div>
              ) : (
                cart?.map((e) => (
                  <>
                    <div className="cardmob">
                      <CartCardMobile p={e.product} q={e.quantity} />
                    </div>
                    <div className="cardweb">
                      <CartCard p={e.product} q={e.quantity} />
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
          <div className="cartRight col-3 position-relative">
            <div className="card-price position-sticky">
              <div className="mb-3">
                <div className="bg-white d-flex flex-column w-100 p-2">
                  <div className="w-100 d-flex align-items-center justify-content-start border-bottom p-3 pt-1">
                    <span className="text-secondary fw-semibold fs-5">
                      PRICE DETAILS
                    </span>
                  </div>
                  <div className="cart-price p-3 d-flex flex-column align-items-start">
                    <div className="w-100 d-flex justify-content-between">
                      <span>Price ({getCartTotal()} items)</span>
                      <span>{format(total)}</span>
                    </div>
                    {/* <div className="mt-3 w-100 d-flex justify-content-between">
                      <span>Discount</span>
                      <span className="text-success">-{format(discount)}</span>
                    </div> */}
                    <div className="mt-3 w-100 d-flex justify-content-between">
                      <span>Delivery Charges</span>
                      <span className="text-success">FREE</span>
                    </div>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between p-3 border-top">
                    <span className="fw-semibold fs-5">Total Amount</span>
                    <span>{format(total)}</span>
                  </div>
                </div>
              </div>
              {auth?.user ? (
                <div className="btn btn-success w-100" onClick={handleCheckout}>
                  CheckOut
                </div>
              ) : (
                <div
                  className="btn btn-warning w-100"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login to CheckOut
                </div>
              )}
            </div>
          </div>
          <div className="cartRightMobile position-fixed bg-white vw-100 p-3">
            <div className="card-price-mobile">
              <div className="mb-3">
                <div className="bg-white d-flex flex-column w-100 p-2">
                  <div className="w-100 d-flex align-items-center justify-content-between p-3 border-top">
                    <span className="fw-semibold fs-5">Total Amount</span>
                    <span>{format(total)}</span>
                  </div>
                </div>
              </div>
              {auth?.user ? (
                <div className="btn btn-success w-100" onClick={handleCheckout}>
                  CheckOut
                </div>
              ) : (
                <div
                  className="btn btn-warning w-100"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login to CheckOut
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Header_Footer>
  );
};

export default CartPage;

// <div className=" cart-page">
//   <div className="row">
//     <div className="col-md-12">
//       <h1 className="text-center bg-light p-2 mb-1">
//         {!auth?.user
//           ? "Hello Guest"
//           : `Hello  ${auth?.token && auth?.user?.name}`}
//         <p className="text-center">
//           {cart?.length
//             ? `You Have ${cart.length} items in your cart ${
//                 auth?.token ? "" : "please login to checkout !"
//               }`
//             : " Your Cart Is Empty"}
//         </p>
//       </h1>
//     </div>
//   </div>
//   <div className="container ">
//     <div className="row ">
//       <div className="col-md-7  p-0 m-0">
//         {cart?.map((p) => (
//           <div className="row card flex-row" key={p._id}>
//             <div className="col-md-4">
//               <img
//                 src={`/api/v1/product/product-photo/${p._id}`}
//                 className="card-img-top"
//                 alt={p.name}
//                 width="100%"
//                 height={"130px"}
//               />
//             </div>
//             <div className="col-md-4">
//               <p>{p.name}</p>
//               <p>{p.description.substring(0, 30)}</p>
//               <p>Price : {p.price}</p>
//             </div>
//             <div className="col-md-4 cart-remove-btn">
//               <button
//                 className="btn btn-danger"
//                 onClick={() => removeCartItem(p._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="col-md-5 cart-summary ">
//         <h2>Cart Summary</h2>
//         <p>Total | Checkout | Payment</p>
//         <hr />
//         <h4>Total : {totalPrice()} </h4>
//         {auth?.user?.address ? (
//           <>
//             <div className="mb-3">
//               <h4>Current Address</h4>
//               <h5>{auth?.user?.address}</h5>
//               <button
//                 className="btn btn-outline-warning"
//                 onClick={() => navigate("/dashboard/user/profile")}
//               >
//                 Update Address
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="mb-3">
//             {auth?.token ? (
//               <button
//                 className="btn btn-outline-warning"
//                 onClick={() => navigate("/dashboard/user/profile")}
//               >
//                 Update Address
//               </button>
//             ) : (
//               <button
//                 className="btn btn-outline-warning"
//                 onClick={() =>
//                   navigate("/login", {
//                     state: "/cart",
//                   })
//                 }
//               >
//                 Plase Login to checkout
//               </button>
//             )}
//           </div>
//         )}
//         <div className="mt-2">
//           {!clientToken || !auth?.token || !cart?.length ? (
//             ""
//           ) : (
//             <>
//               {/* <DropIn
//                 options={{
//                   authorization: clientToken,
//                   paypal: {
//                     flow: "vault",
//                   },
//                 }}
//                 onInstance={(instance) => setInstance(instance)}
//               /> */}

//               <button
//                 className="btn btn-primary"
//                 onClick={handlePayment}
//                 disabled={loading || !instance || !auth?.user?.address}
//               >
//                 {loading ? "Processing ...." : "Make Payment"}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
