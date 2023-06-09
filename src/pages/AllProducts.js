import axios from "axios";
import React, { useEffect, useState } from "react";
import Header_Footer from "../Layout/Header_Footer";
import Product from "../components/ProductCard/Product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //   console.log(products);

  return (
    <Header_Footer title={"All Products"}>
      <div className="mt-3 mb-0 justify-content-center d-flex">
        <strong className="fs-1">All Products</strong>
      </div>
      <hr />
      <div class="container text-center">
        <div class="row">
          {products.map((p) => (
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="p-3">
                <Product p={p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Header_Footer>
  );
};

export default AllProducts;
