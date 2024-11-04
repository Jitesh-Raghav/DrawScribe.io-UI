/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'SuperShiny': ['SuperShiny'],
        'Mario': ['Mario'],
      },
      keyframes: {
        // Defines the breathing animation keyframes
        breathing: {
          '0%, 100%': { transform: 'scale(1)' }, // Start and end at normal size
          '50%': { transform: 'scale(1.05)' },   // Slightly larger at the midpoint
        },
      },
      animation: {
        // Assigns the breathing animation to a class
        breathing: 'breathing 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
