
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
      <div className="sidebar w-64 min-h-screen bg-[#2A3F54] flex flex-col">
        <div className="p-4 text-white text-2xl font-bold border-b border-gray-700">
          Text Extractor
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col p-4 space-y-2">
            <Link to="/" className="flex items-center space-x-2 p-2 rounded hover:bg-[#26B99A] transition-colors">
              <span className="text-[#ECF0F1] hover:text-white">Home</span>
            </Link>
            <Link to="/history" className="flex items-center space-x-2 p-2 rounded hover:bg-[#26B99A] transition-colors">
              <span className="text-[#ECF0F1] hover:text-white">History</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 p-2 rounded hover:bg-[#26B99A] transition-colors">
              <span className="text-[#ECF0F1] hover:text-white">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 rounded hover:bg-[#26B99A] transition-colors text-left"
            >
              <span className="text-[#ECF0F1] hover:text-white">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-8">{children}</div>
    </div>
  );
}
