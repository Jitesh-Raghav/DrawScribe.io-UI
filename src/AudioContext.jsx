// src/AudioContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';


const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audio] = useState(() => new Audio('/theme.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to start audio playback
  const startAudio = () => {
    if (!isPlaying) {
      audio.loop = true;
      audio.muted = false; // Unmute when the user interacts
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Autoplay blocked', error);
      });
    }
  };

  // Start muted audio on page load
  useEffect(() => {
    audio.loop = true;
    audio.muted = true; // Start muted on page load
    audio.play().catch((error) => {
      console.error('Autoplay blocked', error);
    });
  }, [audio]);

  const stopAudio = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ startAudio, stopAudio, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
