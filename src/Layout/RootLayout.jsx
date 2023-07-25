import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarNPS from '../components/Navbar/NavbarNPS'


const RootLayout = () => {


  return (
    <div className='root-layout'>
      <NavbarNPS className='container-fluid'/>
      <main>
          <Outlet /> 
      </main>
    </div>
  )
}

export default RootLayout