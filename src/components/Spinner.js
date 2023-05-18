import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({ path = "login" ,loading = false}) => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => --prev)
        },1000);
        count===0 && navigate(`/${path}`,{
            state: location.pathname
        })
        return () => clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" 
       style={{height: "100vh"}}>
        <div className="d-flex flex-column justify-content-center align-items-center justify-content-between" style={{height: "25vh"}}>
          {
            loading ?
            <h1>Loading...</h1>
            :
            <><h1 style={{color:"red"}}>UnAuthorized Access</h1>
            <h4 style={{color:"grey"}}>Redirecting you to Safe Zone in {count}</h4></>
          }
        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Spinner
