import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header_Footer from "../../Layout/Header_Footer";
import Product from "./../../components/ProductCard/Product";
import AdminSideBar from "./AdminSidebar";
import { FaTrashAlt } from "react-icons/fa";

const Products = () => {
  const [users, setUsers] = useState([]);

  //get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/users`
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure want to delete this User?\n(This process if irreversible)\nAnswer 'yes' or 'no' "
      );
      if (answer.toLowerCase() !== "yes") return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${id}`
      );
      if (data?.success) {
        toast.success("User Deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Header_Footer title={`Dashboard`}>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <AdminSideBar />
          </div>
          <div className="col py-3">
            <div className="w-50 me-auto ms-auto mt-4 p-3 d-flex flex-column align-items-center">
              <div className="w-100 text-center">
                <strong className="fs-2">All Users</strong>
              </div>
              <hr />
              <div className="container p-3 bg-white rounded">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>
                          <FaTrashAlt
                            color={u?.role === 0 ? "red" : "grey"}
                            cursor={u?.role === 0 && "pointer"}
                            onClick={() => {
                              if (u?.role !== 1) {
                                handleDelete(u._id);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header_Footer>
  );
};

export default Products;
