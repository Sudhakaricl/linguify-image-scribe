
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import ExtractedText from '@/components/ExtractedText';
import { ExtractionHistoryItem } from '@/components/HistoryItem';

const HomePage = () => {
  const navigate = useNavigate();
  const [extractedText, setExtractedText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [language, setLanguage] = useState('English');
  
  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Check if there's a current extraction to display (from history)
    const currentExtraction = localStorage.getItem('currentExtraction');
    if (currentExtraction) {
      try {
        const parsed: ExtractionHistoryItem = JSON.parse(currentExtraction);
        setExtractedText(parsed.text);
        setImageUrl(parsed.imageUrl);
        setLanguage(parsed.language);
        // Clear after loading
        localStorage.removeItem('currentExtraction');
      } catch (e) {
        console.error('Failed to parse current extraction', e);
      }
    }
  }, [navigate]);
  
  const handleExtractComplete = (text: string, img: string, lang: string) => {
    setExtractedText(text);
    setImageUrl(img);
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-indigo">Text Extraction</h1>
        <p className="text-gray-600 mb-8">
          Upload an image and extract text in multiple languages
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ImageUpload onExtractComplete={handleExtractComplete} />
            
            {imageUrl && (
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-2">Uploaded Image</h3>
                <img 
                  src={imageUrl} 
                  alt="Uploaded" 
                  className="w-full h-auto max-h-[300px] object-contain rounded-md" 
                />
              </div>
            )}
          </div>
          
          <ExtractedText text={extractedText} language={language} />
        </div>
      </main>
      
      <footer className="py-4 text-center text-gray-500 text-sm border-t mt-auto">
        &copy; {new Date().getFullYear()} Text Extraction App
      </footer>
    </div>
  );
};

export default HomePage;
