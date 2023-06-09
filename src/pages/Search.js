import React from "react";
import { useSearch } from "../context/search";
import Header_Footer from "../Layout/Header_Footer";
import Product from "./../components/ProductCard/Product";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Header_Footer>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        </div>
        <div class="container text-center">
          <div class="row">
            {values?.results.map((p) => (
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div className="p-3">
                  <Product p={p} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Header_Footer>
  );
};

export default Search;
