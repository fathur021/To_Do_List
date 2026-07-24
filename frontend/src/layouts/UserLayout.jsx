import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../common/Sidebar'
import TopBar from '../common/TopBar';

const UserLayout = () => {
  return (
    <div>
        <TopBar/>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default UserLayout