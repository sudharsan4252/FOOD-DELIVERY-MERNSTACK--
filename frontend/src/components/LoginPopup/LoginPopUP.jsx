import React, { useState } from 'react'
import "./LoginPopUP.css"
import { assets } from '../../assets/assets'
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";
export const LoginPopUP = ({ setShowLogin }) => {
  const [CurrState, SetCurrState] = useState("Sign Up");
  const { url, setToken } = useContext(StoreContext);

  const[data,Setdata]=useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler=(event)=>{
    const name= event.target.name
    const value= event.target.value
    Setdata(data=>({...data,[name]:value}))
  }

    const onLogin = async (event)=>{
      event.preventDefault()
      let newUrl = url;
      if(CurrState==="Login"){
        newUrl+="/api/data/login"
      }
      else{
        newUrl+="/api/data/register"
      }
      const response= await axios.post(newUrl,data)
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }
  
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{CurrState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {CurrState === "Login" ? (
            <></>
          ) : 
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="your name"
            />
          }
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="your email"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="password"
          />
        </div>
        <button type='submit' >{CurrState === "Sign Up" ? "create acount" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>by continuing agreeing the term and the condition policy</p>
        </div>
        {CurrState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => SetCurrState("Sign Up")}>click here</span>
          </p>
        ) : (
          <p>
            aldready have an account?{" "}
            <span onClick={() => SetCurrState("Login")}>click here</span>
          </p>
        )}
      </form>
    </div>
  );
};
