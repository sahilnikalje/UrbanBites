import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div id='footer' className='footer'>
      <div className="footer-content">
        <div className='footer-content-left'>
          <img className='footer-logo' src={assets.UrbanBites1_logo}/>
          <p>
           UrbanBites is your go-to destination for fresh, delicious, and affordable meals delivered right to your doorstep. 
           From healthy salads to cheesy pasta and delightful desserts, we serve happiness in every bite. 
           Our mission is to provide quality food with fast service and a seamless ordering experience.
         </p>
         <div className="footer-social-icons">
           <img src={assets.facebook_icon} alt="" />
           <img src={assets.twitter_icon} alt="" />
           <img src={assets.linkedin_icon} alt="" />
         </div>
        </div>

        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+917057062318</li>
            <li>contact@urbanbites.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>© {new Date().getFullYear()} UrbanBites. All Rights Reserved.</p>
    </div>
  )
}

export default Footer