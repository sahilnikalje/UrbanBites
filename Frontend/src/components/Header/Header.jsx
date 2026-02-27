import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
         <div className="header-contents">
               <h2>Order your favourite food here</h2>
               <p>Discover the best meals from top restaurants around you. Freshly prepared, carefully packed, and delivered straight to your doorstep in minutes.</p>
               <button>View Menu</button>
         </div>
    </div>
  )
}

export default Header