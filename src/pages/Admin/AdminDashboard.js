import React from "react";
import Header_Footer from "./../../Layout/Header_Footer";
import { useAuth } from "../../context/auth";
import "./styles/Dashboard.css";
import AdminSideBar from "./AdminSidebar";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Header_Footer title={`Dashboard`}>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <AdminSideBar />
          </div>
          <div className="col py-3">
            <div className="form-container w-50 m-auto bg-light p-5 rounded">
              <h4 className="title w-100 m-auto text-center fw-semibold">
                PROFILE
              </h4>
              <hr />
              <div className="p-3 mt-4">
                <div className="mb-4 d-flex align-items-center row ps-3 pe-3 ">
                  <span className="col-3 fs-3 text-secondary">Name:</span>
                  <span className="col-9 fs-3">{auth.user.name}</span>
                </div>
                <div className="mb-4 d-flex align-items-center row ps-3 pe-3 ">
                  <span className="col-3 fs-3 text-secondary">Email:</span>
                  <span className="col-9 fs-3">{auth.user.email}</span>
                </div>
                <div className="mb-4 d-flex align-items-center row ps-3 pe-3 ">
                  <span className="col-3 fs-3 text-secondary">Phone:</span>
                  <span className="col-9 fs-3">{auth.user.phone}</span>
                </div>
                <div className="mb-4 d-flex align-items-center row ps-3 pe-3 ">
                  <span className="col-3 fs-3 text-secondary">Address:</span>
                  <span className="col-9 fs-3">{auth.user.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header_Footer>
  );
};

export default AdminDashboard;
// <div className='row'>
//   <div className='col-3'>
//     <UserMenu />
//   </div>
//   <div className='col-9'>
//     {auth?.user?.name}
//   </div>
// </div>
