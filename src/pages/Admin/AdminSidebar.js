import React from "react";
import "./styles/Dashboard.css";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <>
      <div className="sidebar d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
        <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none">
          <span className="fs-3 fw-bold d-none d-sm-inline mt-3">
            Dashboard
          </span>
        </div>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <NavLink
              to="/dashboard/admin/profile"
              className="dash-link mt-2 mb-2 nav-link align-middle px-2 py-2 ms-2"
            >
              <span className="ms-1 d-none d-sm-inline">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/updateprofile"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Update Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/orders"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Your Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/allorders"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">All Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/products"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/create-product"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Create Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/create-category"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Create Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/users"
              className="dash-link mt-2 mb-2 nav-link px-2 py-2 ms-2 align-middle"
            >
              <span className="ms-1 d-none d-sm-inline">Users</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSideBar;

<ul>
  <li>
    <NavLink to="/dashboard/admin/profile">Profile</NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/admin/products">Products</NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/admin/create-product">Create Product</NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/admin/create-category">Create Category</NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/admin/users">Users</NavLink>
  </li>
</ul>;
