import { useState } from 'react'
import Root from './components/Root'
import Content from './components/Content'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    
    
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="calculator" element={<Content/>} />
          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
