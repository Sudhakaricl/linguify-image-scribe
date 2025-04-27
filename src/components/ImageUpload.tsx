
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';

interface ImageUploadProps {
  onExtractComplete: (text: string, imageUrl: string, language: string) => void;
}

const ImageUpload = ({ onExtractComplete }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [language, setLanguage] = useState('eng'); // Default to English
  
  // Available languages for text extraction
  const languages = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
    { code: 'chi_sim', name: 'Chinese (Simplified)' },
    { code: 'jpn', name: 'Japanese' },
    { code: 'rus', name: 'Russian' },
    { code: 'ara', name: 'Arabic' },
    { code: 'hin', name: 'Hindi' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleExtract = async () => {
    if (!file || !preview) {
      toast.error('Please select an image first');
      return;
    }

    setExtracting(true);
    
    try {
      // Initialize Tesseract.js worker
      const worker = await createWorker(language);
      
      toast.info(`Extracting text in ${languages.find(l => l.code === language)?.name}...`);
      
      // Extract text from image
      const { data: { text } } = await worker.recognize(file);
      
      // Terminate the worker to free up memory
      await worker.terminate();
      
      // If text was extracted successfully
      if (text) {
        // Save extraction to history
        const newExtraction = {
          id: Date.now().toString(),
          text,
          imageUrl: preview,
          language: languages.find(l => l.code === language)?.name || language,
          timestamp: new Date().toISOString(),
        };
        
        // Get existing history or initialize empty array
        const history = JSON.parse(localStorage.getItem('extractionHistory') || '[]');
        
        // Add new extraction and save back to localStorage
        localStorage.setItem('extractionHistory', JSON.stringify([newExtraction, ...history]));
        
        // Pass extracted text to parent component
        onExtractComplete(
          text, 
          preview, 
          languages.find(l => l.code === language)?.name || language
        );
        
        toast.success('Text extracted successfully!');
      } else {
        toast.error('Could not extract any text from the image');
      }
    } catch (error) {
      console.error('Text extraction error:', error);
      toast.error('Error extracting text. Please try again.');
    } finally {
      setExtracting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Card className="w-full p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Upload Image</h3>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="language" className="text-sm">Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              disabled={extracting}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {!preview ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-indigo transition-colors"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={extracting}
            />
            <p className="text-gray-500">
              Click to upload an image or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supported formats: JPG, PNG, GIF, BMP
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-auto max-h-[400px] object-contain rounded-md" 
              />
              
              <Button 
                variant="destructive" 
                size="icon"
                className="absolute top-2 right-2 w-8 h-8 rounded-full" 
                onClick={handleReset}
                disabled={extracting}
              >
                ×
              </Button>
            </div>
            
            <Button 
              onClick={handleExtract} 
              className="w-full bg-indigo hover:bg-indigo-dark text-white"
              disabled={extracting}
            >
              {extracting ? 'Extracting...' : 'Extract Text'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageUpload;
