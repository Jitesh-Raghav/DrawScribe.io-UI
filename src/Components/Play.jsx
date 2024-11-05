import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection'; // Correct import from @dicebear/collection

const Play = () => {
    const navigate = useNavigate();
    
    // Array of avatar seeds for the Adventurer library
    const adventurerSeeds = [
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

    // Function to generate avatar URI using the Adventurer style
    const generateAvatarDataUri = (seed) => {
        const avatar = createAvatar(adventurer, { seed }); // Using the correct adventurer style here
        return avatar.toDataUri();
    };

    useEffect(() => {
        const uri = generateAvatarDataUri(adventurerSeeds[currentIndex]);
        setAvatarUri(uri);
    }, [currentIndex]);

    // Functions to handle avatar changes
    const handlePrevAvatar = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? adventurerSeeds.length - 1 : prevIndex - 1));
    };

    const handleNextAvatar = () => {
        setCurrentIndex((prevIndex) => (prevIndex === adventurerSeeds.length - 1 ? 0 : prevIndex + 1));
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            playerName,
            language,
            avatar: adventurerSeeds[currentIndex],
        };
        console.log(formData); // Log form data
        navigate('/game'); // Redirect to start game page
    };

    return (
        <div className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col justify-center items-center" style={{ backgroundImage: `url('/bg.png')` }}>
            <h1 className="text-yellow-300 bg-red-600 px-3 font-Mario text-3xl mb-6 font-bold">Game Setup</h1>
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-2xl flex flex-col items-center">

                <form className="w-full flex flex-col items-center text-gray-800" onSubmit={handleSubmit}>
                    {/* Player Name Input */}
                    <div className="mb-6 w-full">
                        <label className="block text-lg font-semibold mb-2">Player Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter player name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)} // Update state on input change
                        />
                    </div>

                    {/* Language Selector */}
                    <div className="mb-6 w-full">
                        <label className="block text-lg font-semibold mb-2">Select Language</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)} // Update state on selection change
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
                        <label className="block text-lg font-semibold mb-2">Player Avatar</label>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={handlePrevAvatar}
                                className="mx-2 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-200"
                            >
                                &lt;
                            </button>
                            <img
                                src={avatarUri}
                                alt="Player Avatar"
                                className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300" // Scaled avatar
                            />
                            <button
                                type="button"
                                onClick={handleNextAvatar}
                                className="mx-2 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-200"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>

                    {/* Start and Private Game Buttons */}
                    <button
                        type="submit" // Change this to submit type to trigger handleSubmit
                        className="w-full py-3 mb-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Play!
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/create-private')}
                        className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                    >
                        Create Private Room
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Play;
