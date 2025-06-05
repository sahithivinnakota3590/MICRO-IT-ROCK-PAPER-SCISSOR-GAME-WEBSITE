import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Choice, GameResult } from '../types/game';
import ChoiceDisplay from './ChoiceDisplay';

interface ResultDisplayProps {
  result: GameResult;
  playerChoice: Choice;
  computerChoice: Choice;
  onPlayAgain: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  playerChoice,
  computerChoice,
  onPlayAgain,
}) => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (result === 'win') {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const getResultMessage = () => {
    switch (result) {
      case 'win':
        return 'You Win!';
      case 'lose':
        return 'You Lose!';
      case 'draw':
        return "It's a Draw!";
    }
  };

  const getResultColor = () => {
    switch (result) {
      case 'win':
        return 'text-green-400';
      case 'lose':
        return 'text-red-400';
      case 'draw':
        return 'text-yellow-400';
    }
  };

  return (
    <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg shadow-lg mb-8 relative overflow-hidden">
      {showParticles && <Particles />}
      
      <h2 className={`text-2xl font-bold mb-6 text-center ${getResultColor()}`}>
        {getResultMessage()}
      </h2>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="mb-4 sm:mb-0 text-center">
          <h3 className="text-lg font-medium mb-2 text-blue-200">Your Choice</h3>
          <ChoiceDisplay choice={playerChoice} highlight={result === 'win'} />
        </div>
        
        <div className="text-lg font-bold mx-4">VS</div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2 text-blue-200">Computer's Choice</h3>
          <ChoiceDisplay choice={computerChoice} highlight={result === 'lose'} />
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={onPlayAgain}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:scale-105"
        >
          <RefreshCw size={20} className="mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
};

// Simple particle effect component for wins
const Particles: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-yellow-400 rounded-full opacity-70"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-animation-${i % 5} ${Math.random() * 1 + 1}s linear infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle-animation-0 {
          0% { transform: translate3d(0, 0, 0); opacity: 1; }
          100% { transform: translate3d(50px, -50px, 0); opacity: 0; }
        }
        @keyframes particle-animation-1 {
          0% { transform: translate3d(0, 0, 0); opacity: 1; }
          100% { transform: translate3d(-50px, -50px, 0); opacity: 0; }
        }
        @keyframes particle-animation-2 {
          0% { transform: translate3d(0, 0, 0); opacity: 1; }
          100% { transform: translate3d(50px, 50px, 0); opacity: 0; }
        }
        @keyframes particle-animation-3 {
          0% { transform: translate3d(0, 0, 0); opacity: 1; }
          100% { transform: translate3d(-50px, 50px, 0); opacity: 0; }
        }
        @keyframes particle-animation-4 {
          0% { transform: translate3d(0, 0, 0); opacity: 1; }
          100% { transform: translate3d(0, -70px, 0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;