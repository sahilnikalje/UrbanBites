import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
   const navigate=useNavigate()
    const[menu, setMenu]=useState("home")
    const {getTotalCartAmount, token, setToken}=useContext(StoreContext)

    //todo logout function
    const logout=()=>{
      localStorage.removeItem("token")
      setToken("")
      navigate('/')
    }
  return (
    <div className='navbar'>
          <Link to='/'>
             <img className='logo'
              src={assets.UrbanBites1_logo} 
              alt='UrbanBites.logo' 
             />    
          </Link>


         <ul className='navbar-menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={menu==='home' ? "active" : ""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==='menu' ? "active" : ""}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==='mobile-app' ? "active" : ""}>Mobile App</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==='contact-us' ? "active" : ""}>Contact Us</a>
         </ul>

         <div className='navbar-right'>
            <img 
            src={assets.search_icon}
             alt="search-icon"
            />
             <div className='navbar-search-icon'>
              <Link to='/cart'><img src={assets.basket_icon} alt="basket-icon"/></Link>
                 
                  {/*cart dot */}
          {/* //!if the cart is empty means 0 then nothing will be there and if it's not then a dot will appear on it */}
                 <div className={getTotalCartAmount()===0 ? "" : "dot"}></div> 
             </div>

             {!token ? 
             <button onClick={()=>setShowLogin(true)}>Signin</button> 
             : 
             <div className='navbar-profile'>
               <img src={assets.profile_icon}/>
               <ul className="nav-profile-dropdown">
                  <li><img src={assets.bag_icon}/> <p>Orders</p></li>
                  <hr/> 
                  <li onClick={logout}><img src={assets.logout_icon}/> <p>Logout</p> </li>  
               </ul>  
             </div>}
             
         </div>
    </div>
  )
}

export default Navbar