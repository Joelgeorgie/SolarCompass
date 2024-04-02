import { useState } from 'react'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Content from './components/Content'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <Content/>
     <Footer/>
    </>
  )
}

export default App
