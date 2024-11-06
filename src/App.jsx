import { useLocation, Route, Routes } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Landing from "./Components/Landing";
import Play from "./Components/Play";
import Game from "./Components/Game";
import End from "./Components/End";
import Create from "./Components/CreateRoom";

export default function App() {
  const location = useLocation(); // Capture location for route animation

  return (
  
     
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/play" element={<Play />} />
          <Route path="/game" element={<Game />} />
          <Route path="/end" element={<End />} />
          <Route path="/create" element={<Create />} />
        </Routes>
     
  );
}
