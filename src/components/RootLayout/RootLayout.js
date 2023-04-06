import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        {/*Header is fixed*/}
        <Header/>
        {/*Outlet is the placeholder for the components for the dynamic main*/}
        <div className='container bg-dark' style={{minHeight:"200vh",minWidth:'100vw'}}>
          <Outlet/>
        </div>
        {/*Footer is fixed*/}
        <Footer/>
    </div>
  )
}

export default RootLayout