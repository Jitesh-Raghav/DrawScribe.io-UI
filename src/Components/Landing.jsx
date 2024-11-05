import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {

  const navigate= useNavigate();
  return (
  
     <div className="bg-cover bg-center bg-no-repeat h-screen w-full flex justify-center" style={{ backgroundImage: `url('/bg.png')` }}>
      <div className="w-full flex flex-col justify-center items-center"style={{ background: 'linear-gradient(to bottom, transparent, black)',opacity: 1,  }} >      
      <h1 className="text-9xl font-bold font-Mario flex space-x-1 animate-breathing">
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

        <button onClick={()=>navigate('/play')} className='mt-8 px-4 py-2 text-xl font-Mario border border-white text-white bg-transparent font-bold rounded-xl hover:bg-pink-600 transition-all duration-100 delay-15 shadow-sm shadow-white'>Play</button>
       </div>
    </div>
  
   
  )
}

export default Landing
