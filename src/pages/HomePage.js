import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/HomePage.css";
import Header_Footer from "./../Layout/Header_Footer";
import Carousal from "../components/Carousal";
import SliderBlock from "../components/SliderBlock";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio] = useState([]);
  const [setTotal] = useState(0);
  const [page] = useState(1);
  const [setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Header_Footer>
      <Carousal />
      {categories.slice(0, 5).map((cat) => (
        <SliderBlock
          key={cat._id}
          id={cat._id}
          category={cat.slug}
          catName={cat.name}
        />
      ))}
      <div
        className="w-100 d-flex align-items-center justify-content-center p-5"
        style={{ backgroundColor: "white" }}
      >
        <Link to="/allproducts" className="text-decoration-none">
          <button className="btn btn-primary">View All Products</button>
        </Link>
      </div>
    </Header_Footer>
  );
};

export default HomePage;

// <div className="container-fluid row mt-3 home-page">
//   <div className="col-md-12 ">
//     <h1 className="text-center">All Products</h1>
//     <div className="d-flex flex-wrap">
//       {products?.map((p) => (
//         <HomePageCard p={p}/>
//       ))}
//     </div>
//     <div className="m-2 p-3">
//       {products && products.length < total && (
//         <button
//           className="btn loadmore"
//           onClick={(e) => {
//             e.preventDefault();
//             setPage(page + 1);
//           }}
//         >
//           {loading ? (
//             "Loading ..."
//           ) : (
//             <>
//               {" "}
//               Loadmore <AiOutlineReload />
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   </div>
// </div>

// <div className="col-md-3 filters">
//   <h4 className="text-center">Filter By Category</h4>
//   <div className="d-flex flex-column">
//     {categories?.map((c) => (
//       <Checkbox
//         key={c._id}
//         onChange={(e) => handleFilter(e.target.checked, c._id)}
//       >
//         {c.name}
//       </Checkbox>
//     ))}
//   </div>
//   {/* price filter */}
//   <h4 className="text-center mt-4">Filter By Price</h4>
//   <div className="d-flex flex-column">
//     <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//       {Prices?.map((p) => (
//         <div key={p._id}>
//           <Radio value={p.array}>{p.name}</Radio>
//         </div>
//       ))}
//     </Radio.Group>
//   </div>
//   <div className="d-flex flex-column">
//     <button
//       className="btn btn-danger"
//       onClick={() => window.location.reload()}
//     >
//       RESET FILTERS
//     </button>
//   </div>
// </div>
