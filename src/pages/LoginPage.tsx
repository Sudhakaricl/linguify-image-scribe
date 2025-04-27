
import React, { useEffect } from 'react';
import AuthForm from '@/components/AuthForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo">
            Text Extraction App
          </h1>
          <p className="text-center mb-8 text-gray-600">
            Login to extract text from your images
          </p>
          <AuthForm type="login" />
        </div>
      </div>
      <footer className="py-4 text-center text-gray-500 text-sm border-t">
        &copy; {new Date().getFullYear()} Text Extraction App
      </footer>
    </div>
  );
};

export default LoginPage;
