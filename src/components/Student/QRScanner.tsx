import React, { useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { QRData } from '../../types';

interface QRScannerProps {
  usn: string;
  onAttendanceMarked: (subject: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ usn, onAttendanceMarked }) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [scannerInitialized, setScannerInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    
    const initializeScanner = async () => {
      try {
        if (!scannerInitialized) {
          html5QrCode = new Html5Qrcode("qr-reader");
          setScannerInitialized(true);
        }
      } catch (err) {
        setError("Failed to initialize camera. Please check permissions.");
      }
    };
    
    initializeScanner();
    
    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(error => console.error("Failed to stop camera:", error));
      }
    };
  }, [scannerInitialized]);
  
  const startScanning = async () => {
    setError(null);
    const html5QrCode = new Html5Qrcode("qr-reader");
    
    try {
      setScanning(true);
      
      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          try {
            const qrData: QRData = JSON.parse(decodedText);
            
            if (qrData && qrData.subject && qrData.timestamp) {
              const now = Date.now();
              if (now - qrData.timestamp < 10000) {
                try {
                  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/attendance`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      usn,
                      subject: qrData.subject,
                    }),
                  });

                  if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to mark attendance');
                  }

                  await html5QrCode.stop();
                  onAttendanceMarked(qrData.subject);
                } catch (err) {
                  setError(err.message);
                }
              } else {
                setError("QR code has expired. Please ask for a fresh code.");
              }
            } else {
              setError("Invalid QR code. Please scan a valid attendance code.");
            }
          } catch (error) {
            setError("Invalid QR code format.");
          }
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      ).catch((err) => {
        setError(`Failed to start camera: ${err.message || "Unknown error"}`);
        setScanning(false);
      });
    } catch (err) {
      setError("Failed to access camera. Please check permissions.");
      setScanning(false);
    }
  };
  
  const stopScanning = () => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    if (html5QrCode) {
      html5QrCode.stop().catch(err => console.error(err));
      setScanning(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div id="qr-reader" className="w-full max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden"></div>
      
      <div className="mt-4 w-full">
        {error && (
          <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg text-error-700 text-sm">
            {error}
          </div>
        )}
        
        {!scanning ? (
          <button
            onClick={startScanning}
            className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <Camera size={18} />
            Start Camera & Scan QR
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <CameraOff size={18} />
            Stop Scanning
          </button>
        )}
        
        <p className="mt-3 text-sm text-gray-500 text-center">
          Position the QR code within the scanner frame
        </p>
      </div>
    </div>
  );
};

export default QRScanner;