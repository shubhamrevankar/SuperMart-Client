import React, { useEffect, useState } from "react";
import Header_Footer from "./../../Layout/Header_Footer";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { CategoryForm } from "../../components/Form/CategoryForm";
import { Button, Modal } from "antd";
import AdminSideBar from "./AdminSidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CreateCategory = () => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/category/create-category",
        { name: value }
      );
      if (data?.success) {
        toast.success(`${data?.category?.name} is created`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong in input form");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong in getting data");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [category]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${data?.category?.name} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong in input form");
    }
  };

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${pid}`
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong in input form");
    }
  };

  // console.log(category);

  return (
    <Header_Footer>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <AdminSideBar />
          </div>
          <div className="col py-3">
            <div className="w-50 bg-light m-auto d-flex flex-column align-items-center pt-4 p-4">
              <h1>Create Category</h1>
              <div className="w-75">
                <CategoryForm
                  value={value}
                  setValue={setValue}
                  handleSubmit={handleSubmit}
                />
              </div>
              <hr/>
              <h4>All Categories</h4>
              {category?.map((c) => {
                return (
                  <div
                    key={c._id}
                    className="w-100 mt-3 d-flex align-items-center justify-content-between p-3 ms-2 me-2 rounded-4 border"
                    style={{backgroundColor:"white"}}
                  >
                    <h3 className="m-0 p-0">{c.name}</h3>
                    <div className="d-flex">
                      <button
                        className="btn text-info"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn text-danger"
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                );
              })}
              <Modal
                onCancel={() => {
                  setVisible(false);
                }}
                footer={null}
                open={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                  role="update"
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Header_Footer>
  );
};

export default CreateCategory;
