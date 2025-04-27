
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export interface ExtractionHistoryItem {
  id: string;
  text: string;
  imageUrl: string;
  language: string;
  timestamp: string;
}

interface HistoryItemProps {
  item: ExtractionHistoryItem;
  onDelete: (id: string) => void;
}

const HistoryItem = ({ item, onDelete }: HistoryItemProps) => {
  const navigate = useNavigate();
  const truncatedText = item.text.length > 100 
    ? `${item.text.substring(0, 100)}...` 
    : item.text;
  
  const timeAgo = formatDistanceToNow(new Date(item.timestamp), { 
    addSuffix: true 
  });
  
  const handleView = () => {
    // Store current item in localStorage so the home page can display it
    localStorage.setItem('currentExtraction', JSON.stringify(item));
    navigate('/');
  };
  
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <Card className="w-full p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          <img 
            src={item.imageUrl} 
            alt="Extracted from" 
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-sm">
                {item.language} Text
              </h4>
              <p className="text-xs text-gray-500">
                {timeAgo}
              </p>
            </div>
            
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleView}
                className="text-xs"
              >
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-xs text-destructive hover:bg-destructive/10"
              >
                Delete
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 overflow-hidden">
            {truncatedText}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HistoryItem;
