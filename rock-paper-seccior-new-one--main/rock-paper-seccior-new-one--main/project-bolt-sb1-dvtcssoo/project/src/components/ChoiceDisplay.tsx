import React from 'react';
import { Scissors, FileText, Circle } from 'lucide-react';
import { Choice } from '../types/game';

interface ChoiceDisplayProps {
  choice: Choice;
  highlight?: boolean;
}

const ChoiceDisplay: React.FC<ChoiceDisplayProps> = ({ choice, highlight = false }) => {
  const getIcon = () => {
    switch (choice) {
      case 'rock':
        return <Circle size={48} />;
      case 'paper':
        return <FileText size={48} />;
      case 'scissors':
        return <Scissors size={48} />;
    }
  };

  const getChoiceColor = () => {
    switch (choice) {
      case 'rock':
        return 'bg-red-600';
      case 'paper':
        return 'bg-blue-600';
      case 'scissors':
        return 'bg-yellow-600';
    }
  };

  return (
    <div 
      className={`
        ${getChoiceColor()} 
        ${highlight ? 'ring-4 ring-white animate-pulse' : ''} 
        rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto transition-all
      `}
    >
      {getIcon()}
    </div>
  );
};

export default ChoiceDisplay;