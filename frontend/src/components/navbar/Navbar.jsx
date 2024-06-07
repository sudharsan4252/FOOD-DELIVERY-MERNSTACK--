import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import { useEffect } from 'react';
export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const{getTotalAmount,token,setToken}=useContext(StoreContext)
  const navigate = useNavigate();
  const logOut =()=>{
    localStorage.removeItem('token');
    setToken("")
    navigate("/")
    
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="asdfgh" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>

          <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="navbar-button">
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/myorders")} ><img src={assets.bag_icon} alt="" />orders</li>
              <hr />
              <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
