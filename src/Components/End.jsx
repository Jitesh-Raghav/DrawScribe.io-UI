import React from 'react';
import { useNavigate } from 'react-router-dom';

const End = () => {
    const navigate = useNavigate();

    return (
        <div  className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col justify-center items-center p-4 md:p-0" style={{ backgroundImage: `url('/bg.png')` }}>
        <div className="h-screen flex items-center justify-center bg-transparent text-white">
            <div className="bg-gray-800 p-8 rounded shadow-lg opacity-90">
                <h1 className="text-3xl font-bold mb-4">Time's up! You lost.</h1>
                <button
                    onClick={() => navigate('/')} // Navigate to home
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
        </div>
    );
};

export default End;
