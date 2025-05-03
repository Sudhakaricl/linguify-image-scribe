
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to the Home page
  useEffect(() => {
    navigate('/'); // Navigate to root route instead of trying to navigate to self
  }, [navigate]);
  
  return null;
};

export default Index;
