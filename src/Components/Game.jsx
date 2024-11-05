import React from 'react';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const location = useLocation();
  const playerName = location.state?.playerName; // Get playerName from state

  return (
    <div>
      <h1 className='text-pink-700 text-7xl font-Mario'>Welcome, {playerName ? playerName : 'Player'}!</h1> {/* Display player name */}
    </div>
  );
};

export default Game;
