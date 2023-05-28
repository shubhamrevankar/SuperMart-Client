import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Header_Footer from "../../Layout/Header_Footer";
import AdminSideBar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [orders, setOrders] = useState([]);

  const [auth] = useAuth();

  
  const navigate = useNavigate();

  const getTotalQuantity = () => {
    const new_tq = orders.map((q) => {
      let t = 0;
      // console.log(q);
      q?.quantity?.map((e) => {
        t += e;
        // console.log(e);
      });
      return t;
    });
    setTotalQuantity(new_tq);
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/get-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (orders) {
      getTotalQuantity();
    }
  }, [orders]);

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const format = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // console.log(totalQuantity);
  // console.log(orders);

  return (
    <Header_Footer title={`Dashboard`}>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <AdminSideBar />
          </div>
          <div className="col py-3">
            <div className="mt-3 mb-0 justify-content-center d-flex">
              <strong className="fs-1">Your Orders</strong>
            </div>
            <hr />
            {orders?.map((o, i) => {
              return (
                <div
                  key={i}
                  className="border rounded mb-3 mt-4 bg-light w-75 m-auto "
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{totalQuantity?.at(i)}</td>
                        <td>{format(o?.payment?.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    className="container"
                    style={{ maxHeight: "400px", overflow: "scroll" }}
                  >
                    {o?.products?.map((p, i1) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-1 text-secondary">{i1 + 1}</div>
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                            onClick={() => {
                              navigate(`/product/${p._id}`);
                            }}
                          />
                        </div>
                        <div className="col-md-7">
                          <p
                            className="fs-5 fw-semibold"
                            onClick={() => {
                              navigate(`/product/${p._id}`);
                            }}
                          >
                            {p.name}
                          </p>
                          <p className="text-secondary">
                            Price :{" "}
                            <span className="fw-semibold text-success">
                              {format(p.price)}
                            </span>
                          </p>
                          <p className="text-secondary">
                            Quantity : {orders?.at(i).quantity?.at(i1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Header_Footer>
  );
};

export default AllOrders;
