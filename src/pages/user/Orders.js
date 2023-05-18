import React from 'react'
import Header_Footer from './../../Layout/Header_Footer';
import UserMenu from '../../components/UserMenu';

const Orders = () => {
  return (
    <Header_Footer>
      <div className='row'>
        <div className='col-3'>
          <UserMenu />
        </div>
        <div className='col-9'>
          Orders
        </div>
      </div>
    </Header_Footer>
  )
}

export default Orders
