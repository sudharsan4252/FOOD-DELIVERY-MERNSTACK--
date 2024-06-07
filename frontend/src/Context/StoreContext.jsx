import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios"
const StoreContextProvider = (props) => {
  const[cartItems,setCartItems]= useState({})
  const url="http://localhost:4000";
  const[token,setToken]=useState("")
  const[food_list,Setfood_list]=useState([])
  const addToCart= async(itemId)=>{
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }

  }

  const removeFromCart = async(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

  const getTotalAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }
const fetchFoodList=async()=>{
  const response = await axios.get(url+"/api/food/list");
  Setfood_list(response.data.data)
}

const loadCardData = async(token)=>{
  const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
  setCartItems(response.data.cartData);
}

  useEffect(()=>{
    
    async function loadData(){
      await fetchFoodList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem('token'))
      }
    }
    loadData();
  },[])

  const contextValue = {
    food_list,
    addToCart,
    cartItems,
    removeFromCart,
    setCartItems,
    getTotalAmount,
    url,
    setToken,
    token
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
