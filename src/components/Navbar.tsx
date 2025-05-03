
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
    <nav className="bg-white shadow-sm border-b border-app-border">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-app-secondary transition-all duration-300 ease-in-out hover:text-app-primary">
            Text Extraction
          </Link>
          
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className={cn(
                    "px-4 py-2 rounded-md transition-all duration-300 ease-in-out",
                    location.pathname === "/" 
                      ? "bg-app-primary/10 text-app-primary font-medium" 
                      : "text-app-text hover:bg-app-primary/10"
                  )}
                >
                  Home
                </Link>
                <Link 
                  to="/history" 
                  className={cn(
                    "px-4 py-2 rounded-md transition-all duration-300 ease-in-out",
                    location.pathname === "/history" 
                      ? "bg-app-primary/10 text-app-primary font-medium" 
                      : "text-app-text hover:bg-app-primary/10"
                  )}
                >
                  History
                </Link>
                <Link 
                  to="/profile" 
                  className={cn(
                    "px-4 py-2 rounded-md transition-all duration-300 ease-in-out",
                    location.pathname === "/profile" 
                      ? "bg-app-primary/10 text-app-primary font-medium" 
                      : "text-app-text hover:bg-app-primary/10"
                  )}
                >
                  <div className="flex items-center gap-1">
                    <User size={18} />
                    Profile
                  </div>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-app-primary text-app-primary hover:bg-app-primary/10 transition-all duration-300 ease-in-out flex items-center gap-1"
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
                    className="border-app-primary text-app-primary hover:bg-app-primary/10 transition-all duration-300 ease-in-out mr-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-app-primary text-white hover:bg-app-primary-hover transition-all duration-300 ease-in-out">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-app-secondary">Text Extraction</Link>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-app-text hover:bg-app-primary/10 transition-all duration-300 ease-in-out"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 border-t border-app-border animate-in slide-in-from-top duration-300 shadow-md">
          <div className="flex flex-col space-y-3">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className={cn(
                    "py-2 px-3 rounded-md transition-all duration-300 ease-in-out",
                    location.pathname === "/" 
                      ? "bg-app-primary/10 text-app-primary font-medium" 
                      : "hover:bg-app-primary/10"
                  )}
                >
                  Home
                </Link>
                <Link 
                  to="/history" 
                  className={cn(
                    "py-2 px-3 rounded-md transition-all duration-300 ease-in-out",
                    location.pathname === "/history" 
                      ? "bg-app-primary/10 text-app-primary font-medium" 
                      : "hover:bg-app-primary/10"
                  )}
                >
                  History
                </Link>
                <Link 
                  to="/profile" 
                  className={cn(
                    "py-2 px-3 rounded-md transition-all duration-300 ease-in-out flex items-center gap-1",
                    location.pathname === "/profile" 
                      ? "bg-app-primary/10 text-app-primary font-medium" 
                      : "hover:bg-app-primary/10"
                  )}
                >
                  <User size={18} />
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="border-app-primary text-app-primary hover:bg-app-primary/10 transition-all duration-300 ease-in-out w-full flex items-center justify-center gap-1"
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
                    className="border-app-primary text-app-primary hover:bg-app-primary/10 transition-all duration-300 ease-in-out w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="bg-app-primary text-white hover:bg-app-primary-hover transition-all duration-300 ease-in-out w-full">
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
}

export default Navbar;
