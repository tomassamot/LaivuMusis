import React, {useState} from "react";
//import logo from './logo.svg'; <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import GameBoard from "game-components/GameBoard";

function App() {
  const [shots, setShots] = useState(25);

  return (
  <div className="App">
    <div className={"wrapper"}>
      <h1>Shots left: {shots}</h1>
      <div className={"board"}>
        <GameBoard
          shots={shots}
          setShots={setShots}
        />
      </div>
    </div>
  </div>
  );
}

export default App;
