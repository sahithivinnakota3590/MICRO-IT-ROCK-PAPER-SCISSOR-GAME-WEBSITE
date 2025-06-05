import React from 'react';
import { History } from 'lucide-react';
import { Choice, GameResult } from '../types/game';

interface GameHistoryProps {
  history: Array<{
    playerChoice: Choice;
    computerChoice: Choice;
    result: GameResult;
  }>;
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const getResultColor = (result: GameResult) => {
    switch (result) {
      case 'win':
        return 'text-green-400';
      case 'lose':
        return 'text-red-400';
      case 'draw':
        return 'text-yellow-400';
    }
  };

  const getResultLabel = (result: GameResult) => {
    switch (result) {
      case 'win':
        return 'Win';
      case 'lose':
        return 'Loss';
      case 'draw':
        return 'Draw';
    }
  };

  return (
    <div className="w-full max-w-md mt-4">
      <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <History className="mr-2" size={20} />
          Game History
        </h2>
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-center text-blue-200">No games played yet</p>
          ) : (
            history.map((game, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center bg-blue-900 bg-opacity-50 p-2 rounded"
              >
                <div className="flex items-center">
                  <span className="capitalize mr-1">{game.playerChoice}</span>
                  <span>vs</span>
                  <span className="capitalize ml-1">{game.computerChoice}</span>
                </div>
                <span className={`font-medium ${getResultColor(game.result)}`}>
                  {getResultLabel(game.result)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameHistory;