
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  React.useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };
  
  return (
    <nav className="bg-indigo text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Text Extraction</Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link 
                to="/" 
                className={cn(
                  "hover:text-gray-200 transition-colors",
                  location.pathname === "/" && "font-bold"
                )}
              >
                Home
              </Link>
              <Link 
                to="/history" 
                className={cn(
                  "hover:text-gray-200 transition-colors",
                  location.pathname === "/history" && "font-bold"
                )}
              >
                History
              </Link>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-indigo"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-indigo mr-2"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-indigo hover:bg-gray-100">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
