import React from "react";
import "./styles/Dashboard.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="sidebar d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none"
        >
          <span className="fs-3 fw-bold d-none d-sm-inline mt-3">
            Dashboard
          </span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <NavLink
              to="/dashboard/user/profile"
              className="dash-link mt-2 mb-2 nav-link align-middle px-2 py-2 ms-2"
            >
              <span className="ms-1 d-none d-sm-inline">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/updateprofile"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Update Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/orders"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Orders</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
