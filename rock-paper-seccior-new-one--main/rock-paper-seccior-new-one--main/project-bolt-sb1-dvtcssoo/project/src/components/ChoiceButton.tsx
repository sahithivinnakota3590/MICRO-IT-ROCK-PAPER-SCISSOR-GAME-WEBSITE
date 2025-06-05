import React from 'react';
import { Scissors, FileText, Circle } from 'lucide-react';
import { Choice } from '../types/game';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ 
  choice, 
  onClick, 
  disabled = false,
  selected = false
}) => {
  const getIcon = () => {
    switch (choice) {
      case 'rock':
        return <Circle className="mx-auto\" size={36} />;
      case 'paper':
        return <FileText className="mx-auto" size={36} />;
      case 'scissors':
        return <Scissors className="mx-auto" size={36} />;
    }
  };

  const getLabel = () => {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
  };

  const baseClasses = "transition-all duration-300 rounded-lg p-4 flex flex-col items-center justify-center h-24";
  
  const getClasses = () => {
    if (disabled && !selected) {
      return `${baseClasses} bg-gray-700 cursor-not-allowed opacity-50`;
    }
    
    if (selected) {
      return `${baseClasses} bg-blue-600 border-2 border-white transform scale-105`;
    }
    
    switch (choice) {
      case 'rock':
        return `${baseClasses} bg-red-600 hover:bg-red-500 hover:scale-105`;
      case 'paper':
        return `${baseClasses} bg-blue-600 hover:bg-blue-500 hover:scale-105`;
      case 'scissors':
        return `${baseClasses} bg-yellow-600 hover:bg-yellow-500 hover:scale-105`;
    }
  };

  return (
    <button
      className={getClasses()}
      onClick={onClick}
      disabled={disabled}
      aria-label={choice}
    >
      {getIcon()}
      <span className="mt-2 font-medium">{getLabel()}</span>
    </button>
  );
};

export default ChoiceButton;