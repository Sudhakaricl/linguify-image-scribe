
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import HistoryItem, { ExtractionHistoryItem } from '@/components/HistoryItem';

const HistoryPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ExtractionHistoryItem[]>([]);
  
  useEffect(() => {
    loadHistory();
  }, [user]);
  
  const loadHistory = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('extraction_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error('Failed to load history');
      return;
    }
    
    setHistory(data || []);
  };
  
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('extraction_history')
      .delete()
      .eq('id', id);
      
    if (error) {
      toast.error('Failed to delete item');
      return;
    }
    
    setHistory(history.filter(item => item.id !== id));
    toast.success('Item deleted from history');
  };
  
  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all history?')) return;
    
    const { error } = await supabase
      .from('extraction_history')
      .delete()
      .eq('user_id', user?.id);
      
    if (error) {
      toast.error('Failed to clear history');
      return;
    }
    
    setHistory([]);
    toast.success('History cleared');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Extraction History</h1>
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
          <Button onClick={() => navigate('/')}>
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
    </div>
  );
};

export default HistoryPage;
