import Footer from '../ui/Footer'
import Navbar from '../ui/Navbar'
import { SignInCard } from '../ui/SignInCard'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
function SignIn() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/blog');
      setIsLoggedIn(true);
    }
  }, [navigate]);
  
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <SignInCard />
      <Footer />
    </div>
  );
}

export default SignIn;
