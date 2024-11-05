import React from 'react';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const location = useLocation();
  const playerName = location.state?.playerName; // Get playerName from state

  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col justify-center items-center" style={{ backgroundImage: `url('/bg.png')` }}>
      <h1 className='text-green-600 bg-gray-300 mx-3 text-7xl font-Mario'>Welcome, {playerName ? playerName : 'Player'}!</h1> {/* Display player name */}
    </div>
  );
};

export default Game;
