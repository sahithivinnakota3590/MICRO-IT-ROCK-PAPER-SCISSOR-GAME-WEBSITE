import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import ChoiceButton from './ChoiceButton';
import ScoreBoard from './ScoreBoard';
import ResultDisplay from './ResultDisplay';
import GameHistory from './GameHistory';
import { determineWinner } from '../utils/gameLogic';
import { Choice, GameResult } from '../types/game';

const Game: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameHistory, setGameHistory] = useState<Array<{
    playerChoice: Choice;
    computerChoice: Choice;
    result: GameResult;
  }>>([]);

  const makeComputerChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handlePlayerChoice = (choice: Choice) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);
    
    // Simulate computer thinking
    setTimeout(() => {
      const computerSelection = makeComputerChoice();
      setComputerChoice(computerSelection);
      
      const gameResult = determineWinner(choice, computerSelection);
      setResult(gameResult);
      
      // Update scores
      if (gameResult === 'win') {
        setPlayerScore(prev => prev + 1);
      } else if (gameResult === 'lose') {
        setComputerScore(prev => prev + 1);
      }
      
      // Add to game history
      setGameHistory(prev => [
        { playerChoice: choice, computerChoice: computerSelection, result: gameResult },
        ...prev.slice(0, 4) // Keep only the last 5 games
      ]);
      
      setIsPlaying(false);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
          <Trophy className="mr-2 text-yellow-400" size={32} />
          Rock Paper Scissors
        </h1>
        <p className="text-blue-200">Choose your weapon and defeat the computer!</p>
      </header>

      <ScoreBoard playerScore={playerScore} computerScore={computerScore} />

      <div className="w-full max-w-md">
        {result ? (
          <ResultDisplay 
            result={result} 
            playerChoice={playerChoice!} 
            computerChoice={computerChoice!} 
            onPlayAgain={resetGame} 
          />
        ) : (
          <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {playerChoice ? 'Computer is choosing...' : 'Make your choice:'}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <ChoiceButton 
                choice="rock" 
                onClick={() => handlePlayerChoice('rock')} 
                disabled={isPlaying || playerChoice !== null}
                selected={playerChoice === 'rock'}
              />
              <ChoiceButton 
                choice="paper" 
                onClick={() => handlePlayerChoice('paper')} 
                disabled={isPlaying || playerChoice !== null}
                selected={playerChoice === 'paper'}
              />
              <ChoiceButton 
                choice="scissors" 
                onClick={() => handlePlayerChoice('scissors')} 
                disabled={isPlaying || playerChoice !== null}
                selected={playerChoice === 'scissors'}
              />
            </div>
          </div>
        )}
      </div>

      {gameHistory.length > 0 && (
        <GameHistory history={gameHistory} />
      )}
    </div>
  );
};

export default Game;