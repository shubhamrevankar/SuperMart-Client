import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div>
      <ul>
        <li><NavLink to="/dashboard/user/profile">Profile</NavLink></li>
        <li><NavLink to="/dashboard/user/orders">Orders</NavLink></li>
      </ul>
    </div>
  )
}

export default UserMenu
