import React, { useState } from 'react';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [language, setLanguage] = useState('English');
  const [drawTime, setDrawTime] = useState(60);
  const [numRounds, setNumRounds] = useState(1);
  const [gameMode, setGameMode] = useState('Classic');
  const [wordCount, setWordCount] = useState(5);
  const [numHints, setNumHints] = useState(1);
  const [customWord, setCustomWord] = useState('');
  const [customWords, setCustomWords] = useState([]);
  const navigate = useNavigate();
  const handleAddCustomWord = () => {
    if (customWord.trim() && customWords.length < 10) {
      setCustomWords([...customWords, customWord.trim()]);
      setCustomWord('');
    }
  };

  const handleRemoveCustomWord = (index) => {
    setCustomWords(customWords.filter((_, i) => i !== index));
  };

  const handleStartGame = () => {
    const roomSettings = {
      numPlayers,
      language,
      drawTime,
      numRounds,
      gameMode,
      wordCount,
      numHints,
      customWords,
    };
    navigate('/game');
    console.log('Game settings:', roomSettings);
  };

  const handleInvite = () => {
    alert('Invite link copied to clipboard!');
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center p-4 md:p-0" style={{ backgroundImage: `url('/bg.png')` }}>
      <h1 className="text-yellow-300 mt-4 bg-red-600 px-3 font-Mario text-2xl md:text-3xl mb-6 font-bold text-center">Create Room</h1>

      <div className="w-full mb-4 max-w-2xl bg-gray-900 opacity-90 p-8 rounded-lg shadow-2xl flex flex-col items-center mx-2 md:mx-auto">
        <form className="w-full flex flex-col items-center text-gray-100 space-y-4">

          {/* Number of Players */}
          <div className="flex w-full items-center">
            <label className="w-1/2 text-md md:text-lg font-semibold mr-4">Number of Players</label>
            <input
              type="number"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              min="2"
              max="10"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Language */}
          <div className="flex w-full items-center">
            <label className="w-1/2 text-md md:text-lg font-semibold mr-4">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Hindi</option>
            </select>
          </div>

          {/* Draw Time */}
          <div className="flex w-full items-center">
            <label className="w-1/2 text-md md:text-lg font-semibold mr-4">Draw Time (secs)</label>
            <input
              type="number"
              value={drawTime}
              onChange={(e) => setDrawTime(e.target.value)}
              min="10"
              max="180"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Number of Rounds */}
          <div className="flex w-full items-center">
            <label className="w-1/2 text-md md:text-lg font-semibold mr-4">Number of Rounds</label>
            <input
              type="number"
              value={numRounds}
              onChange={(e) => setNumRounds(e.target.value)}
              min="1"
              max="10"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Game Mode */}
          <div className="flex w-full items-center">
            <label className="w-1/2 text-md md:text-lg font-semibold mr-4">Game Mode</label>
            <select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
            >
              <option>Classic</option>
              <option>Timed</option>
              <option>Endless</option>
            </select>
          </div>

          {/* Word Count */}
          <div className="flex w-full items-center">
            <label className="w-1/2 text-md md:text-lg font-semibold mr-4">Word Count</label>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              min="1"
              max="10"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Number of Hints */}
          <div className="flex w-full items-center">
            <label className="w-1/2 text-md md:text-lg font-semibold mr-4">Number of Hints</label>
            <input
              type="number"
              value={numHints}
              onChange={(e) => setNumHints(e.target.value)}
              min="0"
              max="3"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Custom Words Input */}
          <div className="w-full">
            <label className="text-md md:text-lg font-semibold mb-2 block">Custom Words</label>
            <input
              type="text"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomWord())}
              placeholder="Enter custom words"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-gray-900 placeholder:text-gray-700"
            />
            <div className="flex flex-wrap gap-2">
              {customWords.slice(0, 10).map((word, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-900 flex items-center">
                  {word}
                  <button
                    onClick={() => handleRemoveCustomWord(index)}
                    className="ml-2 text-gray-600 hover:text-red-500 font-bold"
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Start and Invite Buttons */}
          <button
            type="button"
            onClick={handleStartGame}
            className="w-full py-2 opacity-100 mt-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Start!
          </button>
          <button
            type="button"
            onClick={handleInvite}
            className="w-full py-2 mt-2 opacity-100 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
          >
            Invite
            <AddLinkIcon/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
