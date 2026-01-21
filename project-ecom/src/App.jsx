import { Routes, Route } from 'react-router'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/checkout" element={<HomePage/>}></Route>
        <Route path="/health" element={<p>200OK</p>}></Route>
      </Routes>
      
    </>
  )
}

export default App
