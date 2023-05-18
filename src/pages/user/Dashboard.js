import React from 'react'
import Header_Footer from './../../Layout/Header_Footer';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Header_Footer>
      <div className='row'>
        <div className='col-3'>
          <UserMenu />
        </div>
        <div className='col-9'>
          {auth?.user?.name}
        </div>
      </div>
    </Header_Footer>
  )
}

export default Dashboard
