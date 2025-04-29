
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Text Extraction</Link>
          
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className={cn(
                    "hover:text-gray-200 transition-colors font-medium",
                    location.pathname === "/" && "underline underline-offset-4"
                  )}
                >
                  Home
                </Link>
                <Link 
                  to="/history" 
                  className={cn(
                    "hover:text-gray-200 transition-colors font-medium",
                    location.pathname === "/history" && "underline underline-offset-4"
                  )}
                >
                  History
                </Link>
                <Link 
                  to="/profile" 
                  className={cn(
                    "hover:text-gray-200 transition-colors font-medium",
                    location.pathname === "/profile" && "underline underline-offset-4"
                  )}
                >
                  <div className="flex items-center gap-1">
                    <User size={18} />
                    Profile
                  </div>
                </Link>
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 flex items-center gap-1"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 mr-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 hover:text-indigo-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Text Extraction</Link>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-indigo-500"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-3 border-t border-indigo-500 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className={cn(
                    "py-2 px-3 rounded-md hover:bg-indigo-500 transition-colors",
                    location.pathname === "/" && "bg-indigo-500 font-medium"
                  )}
                >
                  Home
                </Link>
                <Link 
                  to="/history" 
                  className={cn(
                    "py-2 px-3 rounded-md hover:bg-indigo-500 transition-colors",
                    location.pathname === "/history" && "bg-indigo-500 font-medium"
                  )}
                >
                  History
                </Link>
                <Link 
                  to="/profile" 
                  className={cn(
                    "py-2 px-3 rounded-md hover:bg-indigo-500 transition-colors flex items-center gap-1",
                    location.pathname === "/profile" && "bg-indigo-500 font-medium"
                  )}
                >
                  <User size={18} />
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 w-full flex items-center justify-center gap-1"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/login" className="w-full">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100 hover:text-indigo-700 w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
