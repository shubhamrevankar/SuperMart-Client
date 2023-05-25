import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header_Footer from "../Layout/Header_Footer";
import Product from "../components/ProductCard/Product";

const ProductByCat = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProductByCat();
      getAllCategory();
    }
  }, [params?.slug]);

  useEffect(() => {
    categories.map((c) => {
      if (c.slug === params?.slug) {
        setCategory(c.name);
      }
    });
  }, [categories]);

  return (
    <Header_Footer>
      <div className="mt-3 mb-0 justify-content-center d-flex">
        <strong className="fs-1">{category}</strong>
      </div>
      <hr />
      <div class="container text-center">
        <div class="row g-2">
          {products.map((p) => (
            <div className="col-3">
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

export default ProductByCat;
