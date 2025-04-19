import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { RefreshCw } from 'lucide-react';
import { Subject, QRData } from '../../types';

interface QRCodeGeneratorProps {
  subject: Subject;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ subject }) => {
  const [qrData, setQrData] = useState<QRData>({
    subject,
    timestamp: Date.now(),
    id: crypto.randomUUID(),
  });
  
  const [countdown, setCountdown] = useState<number>(2);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Generate new QR code data
          setQrData({
            subject,
            timestamp: Date.now(),
            id: crypto.randomUUID(),
          });
          return 2;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [subject]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-3 rounded-lg shadow-sm relative">
        <QRCode 
          value={JSON.stringify(qrData)} 
          size={180} 
          className="w-full h-auto"
        />
        <div className="absolute -top-2 -right-2 bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
          {countdown}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <RefreshCw size={14} className="animate-spin" />
          QR Code refreshes every 2 seconds
        </p>
        <p className="text-xs text-primary-600 mt-1">
          Ask students to scan this code
        </p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;