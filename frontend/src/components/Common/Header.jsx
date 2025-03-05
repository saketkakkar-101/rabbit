import React from 'react'
import Topbar from '../Layouts/Topbar'
import Navbar from './Navbar'
const Header = () => {
  return (
    
   <header className='border-b border-gray-200'>
     {/* TopBar */}
     <Topbar />
     {/* navbar */}
     <Navbar />
     {/* Cart Drawer */}
     </header>
  
  )
}

export default Header