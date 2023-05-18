import React from 'react'
import Header_Footer from './../../Layout/Header_Footer';
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Header_Footer>
      <div className='row'>
        <div className='col-3'>
          <AdminMenu />
        </div>
        <div className='col-9'>
          {auth?.user?.name}
        </div>
      </div>
    </Header_Footer>
  )
}

export default AdminDashboard
