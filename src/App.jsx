import Landing from "./Components/Landing";
import Play from "./Components/Play";
import Game from "./Components/Game";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
  <>
  <Routes>
     <Route path="/" element={<Landing />}></Route>
     <Route path="/play" element={<Play />}></Route>
     <Route path="/game" element={<Game />}></Route>
  </Routes>
  
  </>
  )
}