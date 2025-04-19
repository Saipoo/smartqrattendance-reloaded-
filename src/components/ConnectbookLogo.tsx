import React from 'react';
import { QrCode } from 'lucide-react';

export const ConnectbookLogo: React.FC<{ className?: string }> = ({ className }) => {
  return <QrCode className={className} />;
};