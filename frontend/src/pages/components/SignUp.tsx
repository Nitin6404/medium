import { useState, useEffect } from 'react';
import Navbar from '../ui/Navbar';
import SignUpCard from '../ui/SignUpCard';
import Footer from '../ui/Footer';

function SignUp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Simulating async operation with setTimeout
    setTimeout(() => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setError("Error retrieving token from localStorage"); // Set error message
      }
    }, 1000); // Adjust the delay as needed or remove it if not necessary
  }, []);

  return (
    <>
      <div className='h-full w-full'>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {error ? (
          <div>Error: {error}</div> // Display error message if there's an error
        ) : isLoggedIn ? (
          <div>You are already logged in.</div> // Display message if user is logged in
        ) : (
          <SignUpCard />
        )}
        <Footer />
      </div>
    </>
  );
}

export default SignUp;