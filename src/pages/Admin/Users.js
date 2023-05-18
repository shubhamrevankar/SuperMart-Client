import React from 'react'
import Header_Footer from './../../Layout/Header_Footer';
import AdminMenu from '../../components/AdminMenu';

const Users = () => {
  return (
    <Header_Footer>
      <div className='row'>
        <div className='col-3'>
          <AdminMenu />
        </div>
        <div className='col-9'>
          Users
        </div>
      </div>
    </Header_Footer>
  )
}

export default Users
