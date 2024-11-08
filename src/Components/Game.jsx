// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'; 
// import { Stage, Layer, Line } from 'react-konva';
// import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
// import { FaPen, FaEraser } from 'react-icons/fa'; 
// import AlarmIcon from '@mui/icons-material/Alarm';
// import DrawIcon from '@mui/icons-material/Draw';

// const targetWord = "APPLE"; 

// const Game = () => {
//     const location = useLocation(); 
//     const { playerName } = location.state || {}; 
//     const [lines, setLines] = useState([]);
//     const [tool, setTool] = useState('pen'); 
//     const [color, setColor] = useState('#000000');
//     const [lineWidth, setLineWidth] = useState(5);
//     const [guess, setGuess] = useState('');
//     const [revealedWord, setRevealedWord] = useState('_ '.repeat(targetWord.length).trim());
//     const [chatMessages, setChatMessages] = useState([]);
//     const [alert, setAlert] = useState('');
//     const [timeLeft, setTimeLeft] = useState(60); 
//     const isDrawing = useRef(false);
//     const [revealedLetters, setRevealedLetters] = useState([]);
//     const [gameOver, setGameOver] = useState(false); 
//     const navigate = useNavigate();
//     const timerId = useRef(null);
//     const letterRevealInterval = useRef(null);

//     const colorPalette = [
//         '#FF0000', '#000000', '#FFFF00', '#FF69B4', '#FFA500', 
//         '#00FF00', '#0000FF', '#800080', '#A52A2A', '#FFFFFF',
//         '#006400', 
//     ];

//     useEffect(() => {
//         if (gameOver) return;

//         timerId.current = setInterval(() => {
//             if (timeLeft > 0) {
//                 setTimeLeft(prevTime => prevTime - 1);
//             } else {
//                 clearInterval(timerId.current);
//                 navigate('/end'); 
//             }
//         }, 1000);

//         letterRevealInterval.current = setInterval(() => {
//             if (timeLeft % 15 === 0 && timeLeft > 0 && revealedLetters.length < targetWord.length) {
//                 const remainingLetters = targetWord.split('').filter((letter, idx) => !revealedLetters.includes(idx));
//                 const randomIndex = Math.floor(Math.random() * remainingLetters.length);
//                 const revealedLetter = targetWord.indexOf(remainingLetters[randomIndex]);
//                 setRevealedLetters(prev => [...prev, revealedLetter]);
//             }
//         }, 15000);

//         return () => {
//             clearInterval(timerId.current);
//             clearInterval(letterRevealInterval.current);
//         };
//     }, [timeLeft, revealedLetters]);

//     useEffect(() => {
//         const updatedWord = targetWord.split('').map((letter, idx) => (
//             revealedLetters.includes(idx) ? letter : '_'
//         )).join(' ');
//         setRevealedWord(updatedWord);
//     }, [revealedLetters]);

//     const handleMouseDown = (e) => {
//         if (gameOver) return;
    
//         const stage = e.target.getStage();
//         const mousePos = stage.getPointerPosition();
    
//         if (mousePos && mousePos.x >= 0 && mousePos.x <= stage.width() && mousePos.y >= 0 && mousePos.y <= stage.height()) {
//             isDrawing.current = true;
//             setLines([...lines, { tool, color, width: lineWidth, points: [mousePos.x, mousePos.y] }]);
//         }
//     };
    
//     const handleMouseMove = (e) => {
//         if (!isDrawing.current || gameOver) return;
    
//         const stage = e.target.getStage();
//         const mousePos = stage.getPointerPosition();
    
//         if (mousePos && mousePos.x >= 0 && mousePos.x <= stage.width() && mousePos.y >= 0 && mousePos.y <= stage.height()) {
//             let lastLine = lines[lines.length - 1];
//             lastLine.points = lastLine.points.concat([mousePos.x, mousePos.y]);
    
//             lines.splice(lines.length - 1, 1, lastLine);
//             setLines(lines.concat());
//         }
//     };
    
//     const handleMouseUp = () => {
//         isDrawing.current = false;
//     };
    
//     const handleGuessSubmit = () => {
//         const newMessage = { message: guess, correct: guess.toUpperCase() === targetWord };
        
//         if (newMessage.correct) {
//             setRevealedWord(targetWord); 
//             setAlert('You won!'); 
//             setGameOver(true); 
//             setTimeout(() => setAlert(''), 3000); 
//         }

//         setChatMessages([...chatMessages, newMessage]); 
//         setGuess('');
//     };

//     return (
//         <div className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col justify-center items-center" style={{ backgroundImage: `url('/bg.png')` }}>
//             <div className="flex flex-col w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] mx-4 sm:mx-8"> {/* Responsive margin and width */}
//                 <div className="flex items-center justify-between mb-1 bg-gray-700 text-white p-4">
//                     <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold font-Mario text-yellow-300">
//                         <span className="text-red-500 text-outline">D</span>
//                         <span className="text-orange-500 text-outline">r</span>
//                         <span className="text-yellow-500 text-outline">a</span>
//                         <span className="text-green-500 text-outline">w</span>
//                         <span className="text-blue-500 text-outline">S</span>
//                         <span className="text-indigo-500 text-outline">c</span>
//                         <span className="text-purple-500 text-outline">r</span>
//                         <span className="text-pink-500 text-outline">i</span>
//                         <span className="text-teal-500 text-outline">b</span>
//                         <span className="text-lime-500 text-outline">e</span>
//                         <span className="text-rose-500 text-outline">.</span>
//                         <span className="text-amber-500 text-outline">i</span>
//                         <span className="text-cyan-500 text-outline">o</span>
//                     </h1>

//                     <span className="text-lg font-semibold">{revealedWord} {targetWord.length}</span>
//                     <div className="flex items-center gap-4">
//                         <span className="text-lg font-Mario px-3">Time Left: {timeLeft}s <AlarmIcon/></span>
//                         <SettingsSuggestIcon className="cursor-pointer text-2xl" />
//                     </div>
//                 </div>

//                 <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8">
//                     <div className="w-full sm:w-1/4 bg-gray-300 p-4 shadow-lg mb-4 sm:mb-0">
//                         <h2 className="text-xl font-bold mb-8 font-Mario border-b border-gray-400">Leaderboard</h2>
//                         <p>Player 1: 10 points</p>
//                         <p>Player 2: 5 points</p>
//                         <p>Player 3: 2 points</p>
//                     </div>

//                     <div className="flex flex-col items-center w-full sm:w-2/3 bg-gray-100 z-10">
//                         <Stage
//                             width={window.innerWidth / 2}
//                             height={window.innerHeight * 0.6}
//                             onMouseDown={handleMouseDown}
//                             onMouseMove={handleMouseMove}
//                             onMouseUp={handleMouseUp}
//                             className="bg-white shadow-lg border rounded-md"
//                         >
//                             <Layer>
//                                 {lines.map((line, i) => (
//                                     <Line
//                                         key={i}
//                                         points={line.points}
//                                         stroke={line.tool === 'eraser' ? '#fff' : line.color}
//                                         strokeWidth={line.width}
//                                         tension={0.5}
//                                         lineCap="round"
//                                         globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
//                                     />
//                                 ))}
//                             </Layer>
//                         </Stage>

//                         <div className="flex gap-2 my-4 px-8 sm:px-0">
//                             <div className="flex gap-2 flex-wrap">
//                                 {colorPalette.map((col, index) => (
//                                     <div
//                                         key={index}
//                                         className="w-8 h-8 cursor-pointer border border-gray-500 rounded hover:border-gray-100"
//                                         style={{ backgroundColor: col }}
//                                         onClick={() => setColor(col)}
//                                     ></div>
//                                 ))}
//                             </div>

//                             <div className="flex gap-4">
//                                 <FaPen
//                                     className={`cursor-pointer text-2xl ${tool === 'pen' ? 'text-blue-500' : ''}`}
//                                     onClick={() => setTool('pen')}
//                                 />
//                                 <FaEraser
//                                     className={`cursor-pointer text-2xl ${tool === 'eraser' ? 'text-blue-500' : ''}`}
//                                     onClick={() => setTool('eraser')}
//                                 />
//                             </div>

//                             <input
//                                 type="range"
//                                 min="1"
//                                 max="20"
//                                 value={lineWidth}
//                                 onChange={(e) => setLineWidth(parseInt(e.target.value))}
//                                 className="border rounded w-24"
//                             />
//                         </div>
//                     </div>

//                     <div className="w-full sm:w-1/4 bg-gray-200 p-4 shadow-lg flex flex-col">
//                         <h2 className="text-xl font-bold mb-6 font-Mario border-b border-gray-400">Chat</h2>
//                         <div className="flex-grow overflow-y-auto border p-2">
//                             {chatMessages.map((msg, i) => (
//                                 <div key={i} className={`p-2 ${msg.correct ? 'bg-green-400' : 'bg-gray-100'} rounded mb-1`}>
//                                     <span className="font-bold">{playerName}:</span> {msg.message}
//                                 </div>
//                             ))}
//                         </div>
//                         <input
//                             type="text"
//                             placeholder="Enter your guess..."
//                             value={guess}
//                             onChange={(e) => setGuess(e.target.value)}
//                             onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                     handleGuessSubmit();
//                                 }
//                             }}
//                             className="border border-gray-400 p-2 rounded w-full mb-2 bg-gray-50 focus:outline-none focus:border-blue-500"
//                         />
//                         <button onClick={handleGuessSubmit} className="bg-blue-500 text-white p-2 rounded">Submit Guess</button>
//                     </div>
//                 </div>

//                 {alert && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">{alert}</div>}
//             </div>
//         </div>
//     );
// };

// export default Game;




import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation to get the player's name
import { Stage, Layer, Line } from 'react-konva';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { FaPen, FaEraser } from 'react-icons/fa'; 
import AlarmIcon from '@mui/icons-material/Alarm';
import DrawIcon from '@mui/icons-material/Draw';
import { useAudio } from '../AudioContext';

const targetWord = "APPLE"; 

const Game = () => {
    const location = useLocation(); // Get the location object to access the state
    const { playerName } = location.state || {}; // Destructure the playerName from the location state
    const [lines, setLines] = useState([]);
    const [tool, setTool] = useState('pen'); 
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(5);
    const [guess, setGuess] = useState('');
    const [revealedWord, setRevealedWord] = useState('_ '.repeat(targetWord.length).trim());
    const [chatMessages, setChatMessages] = useState([]);
    const [alert, setAlert] = useState('');
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
    const isDrawing = useRef(false);
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [gameOver, setGameOver] = useState(false); // New state for game over check
    const navigate = useNavigate();
    const timerId = useRef(null);
    const letterRevealInterval = useRef(null);

    const colorPalette = [
        '#FF0000', '#000000', '#FFFF00', '#FF69B4', '#FFA500', 
        '#00FF00', '#0000FF', '#800080', '#A52A2A', '#FFFFFF',
        '#006400', // Added requested colors
    ];

    // Timer interval to countdown and reveal letters
    useEffect(() => {
        if (gameOver) return;

        timerId.current = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            } else {
                clearInterval(timerId.current);
                navigate('/end'); 
            }
        }, 1000);

        letterRevealInterval.current = setInterval(() => {
            if (timeLeft % 15 === 0 && timeLeft > 0 && revealedLetters.length < targetWord.length) {
                const remainingLetters = targetWord.split('').filter((letter, idx) => !revealedLetters.includes(idx));
                const randomIndex = Math.floor(Math.random() * remainingLetters.length);
                const revealedLetter = targetWord.indexOf(remainingLetters[randomIndex]);
                setRevealedLetters(prev => [...prev, revealedLetter]);
            }
        }, 15000);

        return () => {
            clearInterval(timerId.current);
            clearInterval(letterRevealInterval.current);
        };
    }, [timeLeft, revealedLetters]);

    useEffect(() => {
        const updatedWord = targetWord.split('').map((letter, idx) => (
            revealedLetters.includes(idx) ? letter : '_'
        )).join(' ');
        setRevealedWord(updatedWord);
    }, [revealedLetters]);

    const handleMouseDown = (e) => {
        if (gameOver) return;
    
        const stage = e.target.getStage();
        const mousePos = stage.getPointerPosition();
    
        // Ensure mouse is within canvas bounds
        if (mousePos && mousePos.x >= 0 && mousePos.x <= stage.width() && mousePos.y >= 0 && mousePos.y <= stage.height()) {
            isDrawing.current = true;
            setLines([...lines, { tool, color, width: lineWidth, points: [mousePos.x, mousePos.y] }]);
        }
    };
    
    const handleMouseMove = (e) => {
        if (!isDrawing.current || gameOver) return;
    
        const stage = e.target.getStage();
        const mousePos = stage.getPointerPosition();
    
        // Ensure mouse position is within canvas bounds
        if (mousePos && mousePos.x >= 0 && mousePos.x <= stage.width() && mousePos.y >= 0 && mousePos.y <= stage.height()) {
            let lastLine = lines[lines.length - 1];
            lastLine.points = lastLine.points.concat([mousePos.x, mousePos.y]);
    
            lines.splice(lines.length - 1, 1, lastLine);
            setLines(lines.concat());
        }
    };
    
    const handleMouseUp = () => {
        isDrawing.current = false;
    };
    
    const handleGuessSubmit = () => {
        const newMessage = { message: guess, correct: guess.toUpperCase() === targetWord };
        
        if (newMessage.correct) {
            setRevealedWord(targetWord); 
            setAlert('You won!'); 
            setGameOver(true); 
            setTimeout(() => setAlert(''), 3000); 
        }

        setChatMessages([...chatMessages, newMessage]); 
        setGuess('');
    };

    // const { stopAudio } = useAudio();

    // useEffect(() => {
    //   // Stop the audio when Game loads
    //   stopAudio();
    // }, [stopAudio]);
  

    return (
        <div className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col justify-center items-center" style={{ backgroundImage: `url('/bg.png')` }}>
            <div className="flex flex-col w-[85%] mx-8"> {/* Added mx-8 for margin */}
                <div className="flex items-center justify-between mb-1 bg-gray-700 text-white p-4">
                    <h1 className="text-4xl font-bold font-Mario text-yellow-300">
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

                    <span className="text-lg font-semibold">{revealedWord} {targetWord.length}</span>
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-Mario px-3">Time Left: {timeLeft}s <AlarmIcon/></span>
                        <SettingsSuggestIcon className="cursor-pointer text-2xl" />
                    </div>
                </div>

                <div className="flex flex-grow gap-1">
                    <div className="w-1/4 bg-gray-300 p-4 shadow-lg">
                        <h2 className="text-xl font-bold mb-8 font-Mario border-b border-gray-400">Leaderboard</h2>
                        <p>Player 1: 10 points</p>
                        <p>Player 2: 5 points</p>
                        <p>Player 3: 2 points</p>
                    </div>

                    <div className="flex flex-col items-center w-[60%] bg-gray-100 z-10">
                        <Stage
                            width={window.innerWidth / 2}
                            height={window.innerHeight * 0.6}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            className="bg-white shadow-lg border rounded-md"
                        >
                            <Layer>
                                {lines.map((line, i) => (
                                    <Line
                                        key={i}
                                        points={line.points}
                                        stroke={line.tool === 'eraser' ? '#fff' : line.color}
                                        strokeWidth={line.width}
                                        tension={0.5}
                                        lineCap="round"
                                        globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                                    />
                                ))}
                            </Layer>
                        </Stage>

                        <div className="flex gap-2 my-4 px-8">
                            {/* Color palette and tool buttons */}
                            <div className="flex gap-2">
                                {colorPalette.map((col, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-8 cursor-pointer border border-gray-500 rounded hover:border-gray-100"
                                        style={{ backgroundColor: col }}
                                        onClick={() => setColor(col)}
                                    ></div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <FaPen
                                    className={`cursor-pointer text-2xl ${tool === 'pen' ? 'text-blue-500' : ''}`}
                                    onClick={() => setTool('pen')}
                                />
                                <FaEraser
                                    className={`cursor-pointer text-2xl ${tool === 'eraser' ? 'text-blue-500' : ''}`}
                                    onClick={() => setTool('eraser')}
                                />
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={lineWidth}
                                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                                className="border rounded w-24"
                            />
                        </div>
                    </div>

                    <div className="w-1/4 bg-gray-200 p-4 shadow-lg flex flex-col">
                        <h2 className="text-xl font-bold mb-6 font-Mario border-b border-gray-400">Chat</h2>
                        <div className="flex-grow overflow-y-auto border p-2">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`p-2 ${msg.correct ? 'bg-green-400' : 'bg-gray-100'} rounded mb-1`}>
                                    <span className="font-bold">{playerName}:</span> {msg.message}
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your guess..."
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleGuessSubmit();
                                }
                            }}
                            className="border border-gray-400 p-2 rounded w-full mb-2 bg-gray-50 focus:outline-none focus:border-blue-500"
                        />
                        <button onClick={handleGuessSubmit} className="bg-blue-500 text-white p-2 rounded">Submit Guess</button>
                    </div>
                </div>

                {alert && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">{alert}</div>}
            </div>
        </div>
    );
};

export default Game;









