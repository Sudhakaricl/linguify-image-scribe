
"use client";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If no authenticated user, redirect to login
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="sidebar w-64 min-h-screen bg-sidebar-DEFAULT flex flex-col">
        <div className="p-4 text-white text-2xl font-bold border-b border-sidebar-border bg-sidebar-DEFAULT">
          Text Extractor
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col p-4 space-y-2">
            <Link to="/" className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-hover transition-colors">
              <span className="text-white">Home</span>
            </Link>
            <Link to="/history" className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-hover transition-colors">
              <span className="text-white">History</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-hover transition-colors">
              <span className="text-white">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-hover transition-colors text-left"
            >
              <span className="text-white">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-app-background p-8">{children}</div>
    </div>
  );
}
