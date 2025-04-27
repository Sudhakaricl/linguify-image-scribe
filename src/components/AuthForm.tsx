
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This would be a real API call in a production app
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (type === 'signup') {
        // In a real app, this would be a POST request to your API
        // For demo purposes, we'll just store in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('token', 'demo-token-' + Math.random());
        toast.success('Account created successfully!');
        navigate('/');
      } else {
        // In a real app, this would be a POST request to verify credentials
        // For demo purposes, we'll just check if the username exists
        const storedUsername = localStorage.getItem('username');
        
        if (storedUsername === username) {
          localStorage.setItem('token', 'demo-token-' + Math.random());
          toast.success('Logged in successfully!');
          navigate('/');
        } else {
          toast.error('Invalid username or password');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-lg animation-fade-in bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo">
        {type === 'login' ? 'Login' : 'Create an Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full"
            placeholder="Enter your username"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
            placeholder="Enter your password"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-indigo hover:bg-indigo-dark text-white" 
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : type === 'login' ? 'Login' : 'Sign Up'}
        </Button>
        
        <div className="text-center text-sm mt-4">
          {type === 'login' ? (
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="text-indigo hover:underline">
                Sign up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-indigo hover:underline">
                Login
              </a>
            </p>
          )}
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
