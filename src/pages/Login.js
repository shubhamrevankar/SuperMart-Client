import React, { useState } from 'react'
import Header_Footer from '../Layout/Header_Footer'
import { useAuth } from '../context/auth'

import './styles/Login.css'
import { Link, useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {

  const [auth,setAuth] = useAuth();


  const Navigate = useNavigate();
  const location  = useLocation()

    const [input, setInput] = useState({
        email: "",
        password: "",
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

            const res = await axios.post(`http://localhost:5000/api/v1/auth/login`, { ...input })

            if (res.data.success) {
                // console.log("Logined");
                toast.success("Login Successful");
                setAuth({
                  ...auth,
                  user:res.data.user,
                  token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                Navigate(location.state || "/");
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
        <div className='acenter'><h1>Sign In</h1></div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input name='email' required onChange={handleChange} type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputPassword1" className="form-label">Password</label>
            <input name='password' required onChange={handleChange} type="password" className="form-control" id="inputPassword1" />
        </div>
        <div className="col-12">
            Don't have an account? <Link to='/register'>Sign Up</Link>
        </div>
        <div className="col-12">
            Forgot Password? <Link to='/forgot-password'>Click here</Link>
        </div>
        <div className="col-12 acenter">
            <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    </div></div>
    </Header_Footer>
  )
}

export default Login
