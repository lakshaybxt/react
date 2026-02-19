import axios from "axios";
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrderPage from './pages/order/OrderPage'
import TrackingPage from './pages/tracking/TrackingPage'
import NotFound from './pages/notfound/NotFound'
import './App.css'

function App() {
  const [ cart, setCart ] = useState([]);

  const loadCart = async () => {
    console.log("Load to cart called");
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);    
  }

  useEffect(() => {
    loadCart()
    
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>}/>
        <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} loadCart={loadCart}/>}/>
        <Route path="/health" element={<p>200OK</p>}/>
        <Route path="/orders" element={<OrderPage cart={cart}/>}/>
        <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </>
  );
}

export default App
