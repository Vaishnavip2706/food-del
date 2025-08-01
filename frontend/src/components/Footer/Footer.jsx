import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt=""/>
            <p>  At Tomato, we're passionate about serving fresh flavors and unforgettable experiences. Whether you're craving something spicy, sweet, or savory, our menu is crafted to satisfy every appetite. Thank you for choosing us—your satisfaction is our recipe for success.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>CONTACT US</h2>
            <ul>
                <li>1800-209-1235</li>
                <li>tomatofood@contact.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>© {new Date().getFullYear()} Tomato. All rights reserved</p>
    </div>
  )
}

export default Footer
