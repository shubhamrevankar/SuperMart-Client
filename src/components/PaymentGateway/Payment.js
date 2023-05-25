// // import Header_Footer from "./../../Layout/Header_Footer";

// // import React, { useState, useEffect } from "react";
// // import { loadStripe } from "@stripe/stripe-js";
// // import { Elements } from "@stripe/react-stripe-js";
// // import "./Payment.css";

// // import CheckoutForm from "./CheckoutForm";
// // import "./Payment.css";

// // // Make sure to call loadStripe outside of a component’s render to avoid
// // // recreating the Stripe object on every render.
// // // This is a public sample test API key.
// // // Don’t submit any personally identifiable information in requests made with this key.
// // // Sign in to see your own test API key embedded in code samples.
// // const stripePromise = loadStripe(
// //   "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
// // );

// // const Payment = () => {
// //   const [clientSecret, setClientSecret] = useState("");

// //   useEffect(() => {
// //     // Create PaymentIntent as soon as the page loads
// //     fetch("/create-payment-intent", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
// //     })
// //       .then((res) => res.json())
// //       .then((data) => setClientSecret(data.clientSecret));
// //   }, []);

// //   const appearance = {
// //     theme: "stripe",
// //   };
// //   const options = {
// //     clientSecret,
// //     appearance,
// //   };

// //   return (
// //     <div className="App">
// //       {clientSecret && (
// //         <Elements options={options} stripe={stripePromise}>
// //           <CheckoutForm />
// //         </Elements>
// //       )}
// //     </div>
// //   );
// // };

// // export default Payment;
// import React, { useState, useEffect } from "react";
// import "./Payment.css";
// import axios from "axios";

// const ProductDisplay = () => (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//         <h3>Stubborn Attachments</h3>
//         <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="http://localhost:5000/create-checkout-session" method="POST">
//       <input type="hidden" name="product_ids[]" value="4" />
//       <input type="hidden" name="product_ids[]" value="10" />
//       <input type="hidden" name="product_ids[]" value="7" />
//       <button className="button" type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// export default function Payment() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message ? <Message message={message} /> : <ProductDisplay />;
// }

import React from "react";
// import pic from "../assets/chocolate.png";
import { useState } from "react";

const Payment = () => {
  const itemName = "Ferrero Rocher";
  const itemPrice = 800;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(itemPrice);

  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(finalAmount + itemPrice);
  };

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setFinalAmount(itemPrice);
    }
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  };
  const checkout = () => {
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        items: [
          { id: 1, quantity: quantity, price: itemPrice, name: itemName },
        ],
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
  };

  return (
    <div className="w-full mx-auto">
      <div className="text-center font-raleway w-full max-w-5xl mx-auto my-6">
        <div
          className="font-extrabold text-transparent text-6xl my-10 bg-clip-text
        bg-gradient-to-r from-yellow-400 to-yellow-800"
        >
          Chocolate Corner
        </div>
        <div
          className="flex flex-col lg:flex-row justify-center items-center
        mx-auto w-full my-16 border-2 bg-[#fcf6f6] border-slate-100 shadow-md py-4"
        >
          <div
            className="flex lg:justify-end justify-center items-center mx-auto
            my-24 w-full lg:w-6/12"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLekChjr1wDo-Kb71VXxJfsZVn2ukiZIuWAQ&usqp=CAU"
              alt=""
            />
          </div>
          <div className="flex flex-col lg:w-6/12 w-full py-8">
            <div className="text-4xl font-bold text-yellow-700">{itemName}</div>
            <div className="text-3xl font-semibold my-6 text-slate-600">
              price:&nbsp;&nbsp;₹{itemPrice}
            </div>

            <small className="mt-10 mb-3 font-semibold">Add Quantity</small>
            <div className="flex text-slate-900 justify-center items-center mb-10">
              <span
                onClick={decrement}
                className="select-none w-auto px-4
                py-2 text-5xl bg-red-100 cursor-pointer"
              >
                -
              </span>
              <span className="w-auto px-4 py-2 text-3xl font-semibold">
                {quantity}
              </span>
              <span
                onClick={increment}
                className="select-none w-auto px-4 py-2 text-5xl bg-green-100 
                cursor-pointer"
              >
                +
              </span>
            </div>

            <div className="my-6 text-xl">
              Amount to be paid:
              <span className="text-green-500 text-3xl font-bold pl-3">
                ₹{finalAmount}
              </span>
            </div>
            <div className="my-6">
              <button
                onClick={checkout}
                className="bg-green-400 text-white px-8 py-4 rounded-md text-2xl 
              font-semibold"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
