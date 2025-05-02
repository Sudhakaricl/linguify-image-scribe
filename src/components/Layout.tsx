"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="sidebar w-64 min-h-screen bg-[#2C3E50] flex flex-col">
        <div className="p-4 text-white text-2xl font-bold border-b border-gray-700">
          Text Extractor
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/text-extraction" className="flex items-center space-x-2 p-2 rounded hover:bg-[#34495E] transition-colors">
              <span className="text-[#ECF0F1] hover:text-white">Extract Text</span>
            </Link>
            <Link href="/history" className="flex items-center space-x-2 p-2 rounded hover:bg-[#34495E] transition-colors">
              <span className="text-[#ECF0F1] hover:text-white">History</span>
            </Link>
            <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-[#34495E] transition-colors">
              <span className="text-[#ECF0F1] hover:text-white">Dashboard</span>
            </Link>
          </div>
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 p-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-8">{children}</div>
    </div>
  );
}
