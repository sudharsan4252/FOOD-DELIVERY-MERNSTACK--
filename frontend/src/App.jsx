import React, { useState } from 'react'
import { Navbar } from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Cart } from './pages/Cart/Cart'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder'
import { Footer } from './components/footer/Footer'
import { LoginPopUP } from './components/LoginPopup/LoginPopUP'
import Verify from './pages/Verify/Verify'
import Myorders from './pages/Myorders/Myorders'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <div className="app">
        {showLogin ? <LoginPopUP setShowLogin={setShowLogin} /> : <></>}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders'element={<Myorders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
export default App