
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ImageUpload from '@/components/ImageUpload';
import ExtractedText from '@/components/ExtractedText';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const HomePage = () => {
  const [extractedText, setExtractedText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [language, setLanguage] = React.useState('English');
  const { user } = useAuth();
  
  const handleExtractComplete = async (text: string, img: string, lang: string) => {
    setExtractedText(text);
    setImageUrl(img);
    setLanguage(lang);
    
    if (user) {
      try {
        await supabase.from('extraction_history').insert({
          user_id: user.id,
          text: text,
          image_url: img,
          language: lang
        });
        toast.success('Extraction saved to history');
      } catch (error) {
        toast.error('Failed to save extraction');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Text Extraction</h1>
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
    </div>
  );
};

export default HomePage;
