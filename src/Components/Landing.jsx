import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../AudioContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Landing = () => {
  const [audioRequested, setAudioRequested] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { startAudio } = useAudio();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };


  const clickSound = new Audio('/click.mp3');

  const handleStartClick = () => {
    if (userInput.toLowerCase() === 'ready') {
      clickSound.play();
      setReady(true);
      startAudio(); // Start the audio after user confirms readiness
    } else {
      alert("Please enter 'Ready' to proceed.");
    }
  };

 

  const handlePlayButtonClick = () => {
    // Start audio and navigate to the game page
    clickSound.play();
    startAudio();
    setAudioRequested(true);
    navigate('/play');
  };

  const handleRefresh = () => {
    clickSound.play();
    navigate(0); 
  };

  return (
    <>
      {!ready ? (
       
        <div className="relative h-screen w-full flex items-center justify-center">

          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/image.gif')` }}/>
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative text-center z-10">
            <h1 className="text-white text-4xl mb-4 font-Mario">Enter "Ready" to start</h1>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleStartClick()} // Trigger start on Enter key
              placeholder="Type 'Ready'.."
              className="px-4 py-2 text-xl rounded placeholder:font-Mario placeholder:font-thin placeholder:text-sm"
            />
            <div>
              <button onClick={handleStartClick} className="mt-4 px-6 py-2 text-white bg-green-500 rounded-lg font-Mario hover:border hover:border-white">
                Enter
              </button>
            </div>
          </div>
        </div>

      ) : (
        <div
          className="bg-cover bg-center bg-no-repeat h-screen w-full fixed inset-0 flex justify-center"
          style={{ backgroundImage: `url('/bg.png')` }}
        >
          <div
            className="w-full flex flex-col justify-center items-center px-4 md:px-8"
            style={{ background: 'linear-gradient(to bottom, transparent, black)', opacity: 1 }}
          >
              <h1 className="font-Mario font-bold animate-breathing text-center text-4xl sm:text-7xl md:text-8xl lg:text-9xl flex justify-center flex-wrap gap-1">
                <span className="text-red-500 text-outline">D</span>
                <span className="text-orange-500 text-outline">r</span>
                <span className="text-yellow-500 text-outline">a</span>
                <span className="text-green-500 text-outline">w</span>
                <span className="text-blue-500 text-outline">S</span>
                <span className="text-indigo-500 text-outline">c</span>
                <span className="text-purple-500 text-outline">r</span>
                <span className="text-pink-500 text-outline">i</span>
                <span className="text-teal-500 text-outline">b</span>
                <span className="text-lime-500 text-outline">e</span>
                <span className="text-rose-500 text-outline">.</span>
                <span className="text-amber-500 text-outline">i</span>
                <span className="text-cyan-500 text-outline">o</span>
              </h1>

              
              <button className='mt-8 text-2xl text-gray-200 font-Mario hover:bg-pink-500 hover:bg-opacity-65 px-4 py-2 space-y-2 rounded-xl transition duration-100' onClick={()=>{navigate('/play'); clickSound.play();}}>New Game</button>
              <button className='text-2xl text-gray-200 font-Mario hover:bg-pink-500 hover:bg-opacity-65 px-4 py-2 space-y-2 rounded-xl transition duration-100' onClick={()=>{navigate('/play'); clickSound.play();}}>Continue</button>
              <button className='text-2xl text-gray-200 font-Mario hover:bg-pink-500 hover:bg-opacity-65 px-4 py-2 space-y-2 rounded-xl transition duration-100' onClick={()=>{navigate('/create'); clickSound.play();}}>Settings</button>
              <button className='text-2xl text-gray-200 font-Mario hover:bg-pink-500 hover:bg-opacity-65 px-4 py-2 space-y-2 rounded-xl transition duration-100' onClick={handleRefresh}>Exit</button>

            <button
              onClick={handlePlayButtonClick}
              className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 text-base sm:text-lg md:text-xl font-Mario border border-white text-white bg-transparent font-bold rounded-xl hover:bg-pink-600 transition-all duration-100 delay-15 shadow-sm shadow-white"
            >
              <PlayArrowIcon sx={{ fontSize: { xs: 20, sm: 30 } }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;







// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="bg-cover bg-center bg-no-repeat h-screen w-full fixed inset-0 flex justify-center"
//       style={{ backgroundImage: `url('/bg.png')` }}
//     >
//       <div
//         className="w-full flex flex-col justify-center items-center px-4 md:px-8"
//         style={{ background: 'linear-gradient(to bottom, transparent, black)', opacity: 1 }}
//       >
//         <h1 className="font-Mario font-bold animate-breathing text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
//           {/* Centered "Draw" text on all screen sizes */}
//           <div className="text-center">
//             <span className="text-red-500 text-outline">D</span>
//             <span className="text-orange-500 text-outline">r</span>
//             <span className="text-yellow-500 text-outline">a</span>
//             <span className="text-green-500 text-outline">w</span>
//           </div>

//           {/* "Scribe.io" on next line for small screens, inline for larger screens */}
//           <div className="block sm:inline sm:ml-2 text-center">
//             <span className="text-blue-500 text-outline">S</span>
//             <span className="text-indigo-500 text-outline">c</span>
//             <span className="text-purple-500 text-outline">r</span>
//             <span className="text-pink-500 text-outline">i</span>
//             <span className="text-teal-500 text-outline">b</span>
//             <span className="text-lime-500 text-outline">e</span>
//             <span className="text-rose-500 text-outline">.</span>
//             <span className="text-amber-500 text-outline">i</span>
//             <span className="text-cyan-500 text-outline">o</span>
//           </div>
//         </h1>

//         <button
//           onClick={() => navigate('/play')}
//           className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 text-base sm:text-lg md:text-xl font-Mario border border-white text-white bg-transparent font-bold rounded-xl hover:bg-pink-600 transition-all duration-100 delay-15 shadow-sm shadow-white"
//         >
//           <PlayArrowIcon sx={{ fontSize: { xs: 20, sm: 30 } }} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Landing;
