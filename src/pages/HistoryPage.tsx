
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HistoryItem, { ExtractionHistoryItem } from '@/components/HistoryItem';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<ExtractionHistoryItem[]>([]);
  
  // Check authentication and load history
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Load history from localStorage
    const savedHistory = localStorage.getItem('extractionHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (e) {
        console.error('Failed to parse history', e);
        setHistory([]);
      }
    }
  }, [navigate]);
  
  const handleDelete = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('extractionHistory', JSON.stringify(updatedHistory));
    toast.success('Item deleted from history');
  };
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      localStorage.setItem('extractionHistory', JSON.stringify([]));
      toast.success('History cleared');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-indigo">Extraction History</h1>
            <p className="text-gray-600">
              View your previous text extractions
            </p>
          </div>
          
          {history.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearAll}
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              Clear All
            </Button>
          )}
        </div>
        
        {history.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500 mb-4">No extraction history yet</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-indigo hover:bg-indigo-dark text-white"
            >
              Extract Text Now
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map(item => (
              <HistoryItem 
                key={item.id} 
                item={item} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </main>
      
      <footer className="py-4 text-center text-gray-500 text-sm border-t mt-auto">
        &copy; {new Date().getFullYear()} Text Extraction App
      </footer>
    </div>
  );
};

export default HistoryPage;
