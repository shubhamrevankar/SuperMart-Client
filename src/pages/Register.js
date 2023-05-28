import React, { useState } from "react";
import Header_Footer from "../Layout/Header_Footer";
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const Navigate = useNavigate();

  const [input, setInput] = useState({
    tnc: false,
    name: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
    address: "",
    answer: "",
  });
  // console.log(input);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hey");
    // toast.success("Hey")

    if (input.password !== input.repassword) {
      toast.error("Passwords doesn't match");
      return;
    }

    if (!input.tnc) {
      toast.error("Please agree all T&C to register");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { ...input }
      );

      if (res.data.success) {
        console.log("Registered");
        toast.success("Registered Successfully");
        Navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Header_Footer title={"Register"}>
      <div className="register">
        <div className="register_container">
          <div className="acenter">
            <h1>Sign Up</h1>
          </div>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label htmlFor="inputName4" className="form-label">
                Name
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputName4"
                name="name"
                value={input.name}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                required
                onChange={handleChange}
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={input.email}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPhone4" className="form-label">
                Phone
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputPhone4"
                name="phone"
                value={input.phone}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword1" className="form-label">
                Password
              </label>
              <input
                required
                onChange={handleChange}
                type="password"
                className="form-control"
                id="inputPassword1"
                name="password"
                value={input.password}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Re-Enter Password
              </label>
              <input
                required
                onChange={handleChange}
                type="password"
                className="form-control"
                id="inputPassword4"
                name="repassword"
                value={input.repassword}
              />
            </div>
            <div className="col-6">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St, Mumbai"
                name="address"
                value={input.address}
              />
            </div>
            <div className="col-6">
              <label htmlFor="inputAnswer" className="form-label">
                What is your favourite sport?
              </label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputAnswer"
                name="answer"
                value={input.answer}
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  onChange={() => {
                    setInput((p) => ({ ...p, tnc: !p.tnc }));
                  }}
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  I agree to all terms and conditions.
                </label>
              </div>
            </div>
            <div className="col-12">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
            <div className="col-12 acenter">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </Header_Footer>
  );
};

export default Register;
