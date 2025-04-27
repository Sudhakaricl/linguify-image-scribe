
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

interface ExtractedTextProps {
  text: string;
  language: string;
}

const ExtractedText = ({ text, language }: ExtractedTextProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard!');
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `extracted-text-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Text file downloaded!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title and metadata
    const title = `Extracted Text (${language})`;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title, 20, 20);
    
    // Add timestamp
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    
    // Add the extracted text
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const textLines = doc.splitTextToSize(text, 170);
    doc.text(textLines, 20, 40);
    
    // Save the PDF
    doc.save(`extracted-text-${Date.now()}.pdf`);
    toast.success('PDF downloaded!');
  };

  return (
    <Card className="w-full p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Extracted Text</h3>
          <span className="text-xs text-gray-500">
            Language: {language}
          </span>
        </div>
        
        <div className="border rounded-md p-4 min-h-[200px] max-h-[400px] overflow-y-auto bg-gray-50 whitespace-pre-wrap">
          {text || "No text extracted yet"}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleCopy} 
            variant="outline"
            className="flex-1"
            disabled={!text}
          >
            Copy to Clipboard
          </Button>
          <Button 
            onClick={handleDownloadTxt} 
            className="flex-1 bg-indigo hover:bg-indigo-dark text-white"
            disabled={!text}
          >
            Download .txt
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            className="flex-1 bg-pink hover:bg-pink-dark text-white"
            disabled={!text}
          >
            Download .pdf
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExtractedText;
