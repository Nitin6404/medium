import Dashboard from '../ui/Dashboard'
import Navbar from '../ui/Navbar'
import Footer from '../ui/Footer'
import { useState } from 'react'

const Blog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default Blog