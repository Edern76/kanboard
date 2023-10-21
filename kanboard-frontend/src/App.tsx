import React from 'react';
import logo from './logo.svg';
import { Counter } from './components/counter/Counter';
import './App.css';
import {Board} from "./components/board/Board";

function App() {
  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
