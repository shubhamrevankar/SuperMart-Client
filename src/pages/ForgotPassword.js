import React, { useState } from 'react'
import Header_Footer from '../Layout/Header_Footer'

import './styles/Login.css'
import { Link, useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

const ForgotPassword = () => {



    const Navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        newpassword: "",
        answer: "",
    })
    // console.log(input);

    const handleChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("hey");
        // toast.success("Hey")
        try {

            const res = await axios.post(`http://localhost:5000/api/v1/auth/forgot-password`, { ...input })

            if (res?.data.success) {
                // console.log("Password Reset Successful");
                toast.success("Password Reset Successful");
                Navigate("/login");
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }







  return (
    <Header_Footer>
    <div className='login'>
    <div className='login_container'>
        <div className='acenter'><h1>Reset Password</h1></div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input name='email' required onChange={handleChange} type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputPassword1" className="form-label">New Password</label>
            <input name='newpassword' required onChange={handleChange} type="password" className="form-control" id="inputPassword1" />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputanswer" className="form-label">What is your favorite sport?</label>
            <input name='answer' required onChange={handleChange} type="text" className="form-control" id="inputanswer" />
        </div>
        {/* <div className="col-12">
            Don't have an account? <Link to='/register'>Sign Up</Link>
        </div>
        <div className="col-12">
            Forgot Password? <Link to='/forgot-password'>Click here</Link>
        </div> */}
        <div className="col-12 acenter">
            <button type="submit" className="btn btn-primary">Reset</button>
        </div>
      </form>
    </div></div>
    </Header_Footer>
  )
}

export default ForgotPassword
