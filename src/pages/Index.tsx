
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to the Home page
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Index;
