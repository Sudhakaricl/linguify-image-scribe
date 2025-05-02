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
      <div className="sidebar w-64 min-h-screen bg-[#2C3E50] flex flex-col">
        <div className="p-4 text-white text-2xl font-bold border-b border-gray-700">
          Text Extractor
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/text-extraction">
              <p className="text-white hover:text-gray-300">Extract Text</p>
            </Link>
            <Link href="/history">
              <p className="text-white hover:text-gray-300">History</p>
            </Link>
            <Link href="/dashboard">
              <p className="text-white hover:text-gray-300">Dashboard</p>
            </Link>
          </div>
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-8">{children}</div>
    </div>
  );
}
