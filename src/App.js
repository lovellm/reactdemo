import React, { useReducer } from 'react';
import RenderCounter, { RenderCounterMemo } from './components/RenderCounter';
import './App.css';

const incrementReducer = (state) => state + 1;

function App() {
  const [counter, increaseCounter] = useReducer(incrementReducer, 0);

  return (
    <div className="App">
      <h1>Demo App for Various Topics</h1>
      <div style={{ marginBottom: '0.5rem' }}>
        State Variable in App: {counter}
        <button onClick={increaseCounter}>Increase</button>
      </div>
      <RenderCounter />
      <RenderCounterMemo/>
      <RenderCounterMemo test={Math.floor(counter/3)} key={Math.floor(counter/12)} />
    </div>
  );
}

export default App;
