import React from "react";
import cancel from "./images/cancel.png";
import { Link } from "react-router-dom";

const Failure = () => {
  return (
    <div
      className="vw-100 vh-100 d-flex flex-column align-items-center"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div className="w-100 d-flex flex-column align-items-center mt-5">
        <span className="text-danger fs-1 fw-bolder">
          Something went wrong!!
        </span>
        <span className="text-warning fs-3 fw-semibold">
          Please retry after sometime
        </span>
        <div style={{ width: "400px" }}>
          <img src={cancel} alt="Success" />
        </div>
        <div className="d-flex p-3 w-100 align-items-center justify-content-center">
          <div className="btn btn-info ms-auto me-2">
            <Link
              to="/"
              className="underline text-xl underline-offset-4 text-decoration-none text-light"
            >
              Back to Home
            </Link>
          </div>
          <div className="btn btn-info me-auto ms-2">
            <Link
              to="/cart"
              className="underline text-xl underline-offset-4 text-decoration-none text-light"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Failure;
