import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/ProductDetails.css";
import Header_Footer from "../Layout/Header_Footer";
import { FaStar, FaTag } from "react-icons/fa";

const ProductDetails = () => {
  const reviews = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Header_Footer>
      <div className="product-details">
        <div className="row container product-details">
          <div className="product-image-wrap col-md-5">
            <div className="product-image">
              <div className="w-100">
                <img
                  src={`/api/v1/product/product-photo/${product?._id}`}
                  className="card-imggg"
                  alt={product?.name}
                />
                <div className="d-flex align-items-center justify-content-evenly p-3 mt-4 row">
                  <button className="btn btn-info col-5 me-1">
                    ADD TO CART
                  </button>
                  <button className="btn btn-warning col-6 ms-1">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 product-details-info mt-4">
            <span className="title">{product?.name}</span>
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center bg-success rounded-1 justify-content-evenly me-2"
                style={{ width: "40px", color: "white" }}
              >
                <span>4</span>
                <FaStar size={13} />
              </div>
              <span style={{ color: "grey" }}>1,118 Ratings & 122 Reviews</span>
            </div>
            <h2 className="">
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>

            <h6>Available offers</h6>
            <span className="fs-6 fw-light" style={{ letterSpacing: "-1px" }}>
              <FaTag color="green" className="me-2" />
              <strong style={{ letterSpacing: "1px" }}>Bank Offer</strong> Flat
              ₹1250 Discount on HDFC Bank Credit Card EMI Transactions on orders
              of ₹15,000 and above
            </span>
            <span className="fs-6 fw-light" style={{ letterSpacing: "-1px" }}>
              <FaTag color="green" className="me-2" />
              <strong style={{ letterSpacing: "1px" }}>Bank Offer</strong> Flat
              ₹4000 Discount on HDFC Bank Credit Card EMI Transactions on orders
              of ₹50,000 and above
            </span>
            <span className="fs-6 fw-light" style={{ letterSpacing: "-1px" }}>
              <FaTag color="green" className="me-2" />
              <strong style={{ letterSpacing: "1px" }}>Bank Offer</strong> 10%
              off on DBS Bank Debit and Credit Card Transactions, up to ₹1500.
              On orders of ₹5,000 and above
            </span>
            <span className="fs-6 fw-light" style={{ letterSpacing: "-1px" }}>
              <FaTag color="green" className="me-2" />
              <strong style={{ letterSpacing: "1px" }}>
                Partner Offer
              </strong>{" "}
              Sign up for SuperMart Pay Later and get SuperMart Gift Card worth
              up to ₹500*
            </span>

            <div className="row mt-5">
              <div className="col-2 text-secondary">Warranty</div>
              <div className="col-10">
                2 Year Warranty (1 year standard warranty + 1 year additional
                warranty from the date of purchase made by the customer.)
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-2 text-secondary">Description</div>
              <div className="col-10">{product?.description}</div>
            </div>

            <div className="mt-5 border border-dark-subtle p-3">
              <h3 className="mt-2 mb-4">Ratings & Reviews</h3>
              {reviews.map((i) => (
                <>
                  <hr />
                  <div className="d-flex align-items-center mt-4">
                    <div
                      className="d-flex align-items-center bg-success rounded-1 justify-content-evenly me-2"
                      style={{ width: "40px", color: "white" }}
                    >
                      <span>4</span>
                      <FaStar size={13} />
                    </div>
                    <span>
                      <strong>Best in the market!</strong>
                    </span>
                  </div>
                  <p className="mt-3 mb-5">
                    wow wow wow....as expected with this you should need
                    converter 24mm prime ,50mm prime, and 10 18 wide angel and
                    you are ready
                  </p>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr />
    </Header_Footer>
  );
};

export default ProductDetails;
// <div className="row container similar-products">
//   <h4>Similar Products ➡️</h4>
//   {relatedProducts.length < 1 && (
//     <p className="text-center">No Similar Products found</p>
//   )}
//   <div className="d-flex flex-wrap">
//     {relatedProducts?.map((p) => (
//       <div className="card m-2" key={p._id}>
//         <img
//           src={`/api/v1/product/product-photo/${p._id}`}
//           className="card-img-top"
//           alt={p.name}
//         />
//         <div className="card-body">
//           <div className="card-name-price">
//             <h5 className="card-title">{p.name}</h5>
//             <h5 className="card-title card-price">
//               {p.price.toLocaleString("en-US", {
//                 style: "currency",
//                 currency: "USD",
//               })}
//             </h5>
//           </div>
//           <p className="card-text ">
//             {p.description.substring(0, 60)}...
//           </p>
//           <div className="card-name-price">
//             <button
//               className="btn btn-info ms-1"
//               onClick={() => navigate(`/product/${p.slug}`)}
//             >
//               More Details
//             </button>
//             {/* <button
//             className="btn btn-dark ms-1"
//             onClick={() => {
//               setCart([...cart, p]);
//               localStorage.setItem(
//                 "cart",
//                 JSON.stringify([...cart, p])
//               );
//               toast.success("Item Added to cart");
//             }}
//           >
//             ADD TO CART
//           </button> */}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
