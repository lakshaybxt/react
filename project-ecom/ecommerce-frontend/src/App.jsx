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

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart}/>}/>
        <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />}/>
        <Route path="/health" element={<p>200OK</p>}/>
        <Route path="/orders" element={<OrderPage cart={cart}/>}/>
        <Route path="/tracking" element={<TrackingPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </>
  );
}

export default App
