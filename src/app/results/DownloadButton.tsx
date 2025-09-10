'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, LoaderCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    const content = document.getElementById('results-content');
    if (content) {
      try {
        const canvas = await html2canvas(content, {
          scale: 2, // Higher scale for better quality
          backgroundColor: null, // Use transparent background to capture styling
          useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('tarot-mistical-insight-results.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
        // You might want to show a toast notification here
      }
    }
    setIsDownloading(false);
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      size="lg"
      variant="outline"
      className="font-bold text-lg px-8 py-6"
    >
      {isDownloading ? (
        <>
          <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="mr-3 h-6 w-6" />
          Download PDF
        </>
      )}
    </Button>
  );
}
