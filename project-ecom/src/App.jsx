import { Routes, Route } from 'react-router'
import { useState } from 'react'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrderPage from './pages/order/OrderPage'
import TrackingPage from './pages/tracking/TrackingPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/health" element={<p>200OK</p>}/>
        <Route path="/orders" element={<OrderPage/>}/>
        <Route path="/tracking" element={<TrackingPage/>}/>
      </Routes>
      
    </>
  );
}

export default App
