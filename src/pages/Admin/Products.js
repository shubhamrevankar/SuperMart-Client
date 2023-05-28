import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header_Footer from "../../Layout/Header_Footer";
import AdminMenu from "../../components/AdminMenu";
import Product from "./../../components/ProductCard/Product";
import AdminSideBar from "./AdminSidebar";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Header_Footer title={`Dashboard`}>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <AdminSideBar />
          </div>
          <div className="col py-3">
            <div className="mt-3 mb-0 justify-content-center d-flex">
              <strong className="fs-1">All Products</strong>
            </div>
            <hr />
            <div class="container text-center">
              <div class="row g-2">
                {products.map((p) => (
                  <div className="col-3">
                    <div className="p-3">
                      <Product p={p} update={true} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header_Footer>
  );
};

export default Products;
