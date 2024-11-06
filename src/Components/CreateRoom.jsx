import React, { useState } from 'react';

const CreateRoom = () => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [language, setLanguage] = useState('English');
  const [drawTime, setDrawTime] = useState(60); // default 60 seconds
  const [numRounds, setNumRounds] = useState(1);
  const [gameMode, setGameMode] = useState('Classic');
  const [wordCount, setWordCount] = useState(5);
  const [numHints, setNumHints] = useState(1);
  const [customWord, setCustomWord] = useState('');
  const [customWords, setCustomWords] = useState([]);

  const handleAddCustomWord = () => {
    if (customWord.trim() && customWords.length < 10) {
      setCustomWords([...customWords, customWord.trim()]);
      setCustomWord('');
    }
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
    console.log('Game settings:', roomSettings);
    // Navigate to the game page or send settings to backend
  };

  const handleInvite = () => {
    alert('Invite link copied to clipboard!');
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col items-center p-4 md:p-0" style={{ backgroundImage: `url('/bg.png')` }}>
      <h1 className="text-yellow-300 bg-red-600 px-3 font-Mario text-2xl md:text-3xl mb-6 font-bold text-center">Create Room</h1>

      <div className="w-full max-w-md md:max-w-lg bg-gray-100 p-6 md:p-8 rounded-lg shadow-2xl flex flex-col items-center mx-2 sm:mx-6 md:mx-auto">
        <form className="w-full flex flex-col items-center text-gray-800">

          {/* Number of Players */}
          <label className="block text-md md:text-lg font-semibold mb-2">Number of Players</label>
          <input
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
            min="2"
            max="10"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          />

          {/* Language */}
          <label className="block text-md md:text-lg font-semibold mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Hindi</option>
          </select>

          {/* Draw Time */}
          <label className="block text-md md:text-lg font-semibold mb-2">Draw Time (secs)</label>
          <input
            type="number"
            value={drawTime}
            onChange={(e) => setDrawTime(e.target.value)}
            min="10"
            max="180"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          />

          {/* Number of Rounds */}
          <label className="block text-md md:text-lg font-semibold mb-2">Number of Rounds</label>
          <input
            type="number"
            value={numRounds}
            onChange={(e) => setNumRounds(e.target.value)}
            min="1"
            max="10"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          />

          {/* Game Mode */}
          <label className="block text-md md:text-lg font-semibold mb-2">Game Mode</label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option>Classic</option>
            <option>Timed</option>
            <option>Endless</option>
          </select>

          {/* Word Count */}
          <label className="block text-md md:text-lg font-semibold mb-2">Word Count</label>
          <input
            type="number"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
            min="1"
            max="10"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          />

          {/* Number of Hints */}
          <label className="block text-md md:text-lg font-semibold mb-2">Number of Hints</label>
          <input
            type="number"
            value={numHints}
            onChange={(e) => setNumHints(e.target.value)}
            min="0"
            max="3"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          />

          {/* Custom Words Input */}
          <label className="block text-md md:text-lg font-semibold mb-2">Custom Words</label>
          <input
            type="text"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomWord())}
            placeholder="Enter a word and press Enter"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {customWords.slice(0, 10).map((word, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-lg text-sm">{word}</span>
            ))}
          </div>

          {/* Start and Invite Buttons */}
          <button
            type="button"
            onClick={handleStartGame}
            className="w-full py-2 md:py-3 mt-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Start Game
          </button>
          <button
            type="button"
            onClick={handleInvite}
            className="w-full py-2 md:py-3 mt-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
          >
            Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
