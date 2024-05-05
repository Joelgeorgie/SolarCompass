import { useState } from 'react'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Content from './components/Content'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <NavBar/> */}
    {/* <Content/> */}
    <Dashboard/>
     <Footer/>
    </>
  )
}

export default App
