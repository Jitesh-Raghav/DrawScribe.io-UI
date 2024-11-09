import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adventurer } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { avataaarsNeutral } from '@dicebear/collection';
import { dylan } from '@dicebear/collection';

const Play = () => {
  const navigate = useNavigate();

  const clickSound = new Audio('/click.mp3');
  const playSound = new Audio('/start.mp3');

  const dylanSeeds = [
    'hero1',
    'hero2',
    'hero3',
    'hero4',
    'hero5',
    'hero6',
    'hero7',
    'hero8',
    'hero9',
    'hero10',
    'hero11',
    'hero12',
    'hero13',
    'hero14',
    'hero15',
    'hero16',
    'hero17',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [avatarUri, setAvatarUri] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [language, setLanguage] = useState('English');

  const generateAvatarDataUri = (seed) => {
    const avatar = createAvatar(dylan, { seed });
    return avatar.toDataUri();
  };

  useEffect(() => {
    const uri = generateAvatarDataUri(dylanSeeds[currentIndex]);
    setAvatarUri(uri);
  }, [currentIndex]);

  const handlePrevAvatar = () => {
    clickSound.play();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? dylanSeeds.length - 1 : prevIndex - 1));
  };

  const handleNextAvatar = () => {
    clickSound.play();
    setCurrentIndex((prevIndex) => (prevIndex ===dylanSeeds.length - 1 ? 0 : prevIndex + 1));
  };

  const handleSubmit = (event) => {
   
    event.preventDefault();
    const formData = {
      playerName,
      language,
      avatar: dylanSeeds[currentIndex],
    };
    console.log(formData);
    navigate('/game', { state: { playerName } });
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen max-w-full flex flex-col justify-center items-center p-4 md:p-0" style={{ backgroundImage: `url('/bg.png')` }}>
      
      <h1 className="text-yellow-300 bg-red-600 px-3 font-Mario text-2xl md:text-3xl mb-6 font-bold text-center">Game Setup</h1>
      
      <div className="w-full max-w-md md:max-w-lg bg-gray-900 opacity-90 p-6 md:p-8 rounded-lg shadow-2xl flex flex-col items-center mx-2 sm:mx-6 md:mx-auto">
        <form className="w-full flex flex-col items-center text-gray-800" onSubmit={handleSubmit}>
          
          {/* Player Name Input */}
          <div className="mb-4 w-full">
            <label className="block text-md md:text-lg font-semibold mb-2 text-gray-100">Player Name</label>
            <input
              type="text"
              className="w-full p-2 md:p-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>

          {/* Language Selector */}
          <div className="mb-4 w-full">
            <label className="block text-md md:text-lg font-semibold mb-2 text-gray-100">Select Language</label>
            <select
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Hindi</option>
            </select>
          </div>

          {/* Player Avatar */}
          <div className="mb-6 flex flex-col items-center">
            <label className="block text-md md:text-lg font-semibold mb-2 text-gray-100">Player Avatar</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handlePrevAvatar}
                className="mx-6 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-200"
              >
                &lt;
              </button>
              <img
                src={avatarUri}
                alt="Player Avatar"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={handleNextAvatar}
                className="mx-6 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-200"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Start and Private Game Buttons */}
          <button
            type="submit"
            onClick={()=>{playSound.play();}}
            className="w-full py-2 md:py-3 mb-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 text-sm md:text-base"
          >
            Play!
          </button>
          <button
            type="button"
            onClick={() => {
                navigate('/create')
                clickSound.play();
            }}
            className="w-full py-2 md:py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200 text-sm md:text-base"
          >
            Create Private Room
          </button>
        </form>
      </div>
      </div>
   
  );
};

export default Play;
