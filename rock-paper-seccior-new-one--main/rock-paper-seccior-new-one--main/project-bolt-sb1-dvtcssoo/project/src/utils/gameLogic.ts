import { Choice, GameResult } from '../types/game';

export const determineWinner = (playerChoice: Choice, computerChoice: Choice): GameResult => {
  if (playerChoice === computerChoice) {
    return 'draw';
  }
  
  switch (playerChoice) {
    case 'rock':
      return computerChoice === 'scissors' ? 'win' : 'lose';
    case 'paper':
      return computerChoice === 'rock' ? 'win' : 'lose';
    case 'scissors':
      return computerChoice === 'paper' ? 'win' : 'lose';
  }
};