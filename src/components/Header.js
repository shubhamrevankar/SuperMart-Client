import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles/Header.css";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import { useSearch } from "../context/search";
import axios from "axios";
import { useCart } from "../context/cart";

const Header = () => {
  const Navigate = useNavigate();

  const [values, setValues] = useSearch();

  const [auth, setAuth] = useAuth();

  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      console.log(data);
      setValues({ ...values, results: data });
      Navigate("/search");
    } catch (error) {}
  };

  // console.log("auth.user"+JSON.stringify(auth?.user));

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            SUPERMART
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="searchbox d-flex"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keyword}
                onChange={(e) => {
                  setValues({ ...values, keyword: e.target.value });
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav me-0 mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/about">
                  ABOUT
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/contact">
                  CONTACT
                </NavLink>
              </li>
              {auth.user ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link
                        className="dropdown-item"
                        aria-current="page"
                        to={`/dashboard/${
                          auth?.user?.role == 1 ? "admin" : "user"
                        }`}
                      >
                        DASHBOARD
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        onClick={handleLogout}
                        className="dropdown-item"
                        aria-current="page"
                        to="/login"
                      >
                        SIGN OUT
                      </Link>
                    </li>
                    {/* <li><Link className="dropdown-item" to="#">Action</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="#">Something else here</Link></li> */}
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      SIGN IN
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      SIGN UP
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/cart">
                  CART {cart?.length}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
