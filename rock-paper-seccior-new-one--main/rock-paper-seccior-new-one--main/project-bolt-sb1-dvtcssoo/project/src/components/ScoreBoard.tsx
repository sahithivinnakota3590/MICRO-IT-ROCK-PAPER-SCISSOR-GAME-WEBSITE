import React from 'react';
import { User, Monitor } from 'lucide-react';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ playerScore, computerScore }) => {
  return (
    <div className="bg-blue-800 bg-opacity-70 rounded-lg shadow-lg p-4 mb-8 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2 text-center">Scoreboard</h2>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center p-3 rounded-lg bg-blue-900 bg-opacity-50 w-1/2 mr-2">
          <div className="flex items-center mb-1">
            <User className="mr-1 text-green-400" size={20} />
            <span className="font-medium">You</span>
          </div>
          <span className="text-3xl font-bold text-green-400">{playerScore}</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-blue-900 bg-opacity-50 w-1/2 ml-2">
          <div className="flex items-center mb-1">
            <Monitor className="mr-1 text-red-400" size={20} />
            <span className="font-medium">Computer</span>
          </div>
          <span className="text-3xl font-bold text-red-400">{computerScore}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;