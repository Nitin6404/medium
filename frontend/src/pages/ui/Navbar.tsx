import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt, FaPlusCircle } from "react-icons/fa";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isLoggedIn, setIsLoggedIn }: NavbarProps) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();

  const handleSignInButton = () => {
    navigate("/signin");
  };

  const handleSignOutButton = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleCreatePost = () => {
    navigate("/blog/create");
  };

  return (
    <nav className="py-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-lg font-semibold px-4 relative">
          <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent animate-shine">
            MyApp
          </span>
        </a>

        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleCreatePost}
                className="ml-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-blue-700 active:bg-blue-800"
              >
                <FaPlusCircle className="text-xl mr-2" />
                Create Post
              </button>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={handleToggleDropdown}
                  className="ml-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-blue-700 active:bg-blue-800"
                >
                  <FaUserCircle className="text-xl mr-2" />
                  Account
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    <a
                      href="/signin"
                      onClick={handleSignOutButton}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={handleSignInButton}
              className="ml-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-blue-700 active:bg-blue-800"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;