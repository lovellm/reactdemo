import React, { useReducer, useState } from 'react';
import RenderingMemo from './components/RenderingMemo';
import EffectInLine from './components/EffectInLine';
import EffectMemo from './components/EffectMemo';
import './App.css';

// Assumes state is number, returns increment of it
const incrementReducer = (state) => state + 1;

// Tabs / Pages
const tabOptions = [
  { id: 'basicRendering', text: 'App State / Rendering' },
  { id: 'effectOrNot', text: 'useEffect / In-line' },
  { id: 'effectMemo', text: 'useEffect / useMemo' },
  { id: 'hookDeps', text: 'Hook Deps' },
];

function App() {
  const [currentTab, setCurrentTab] = useState(tabOptions[0].id);
  const [counter, increaseCounter] = useReducer(incrementReducer, 0);

  return (
    <div className="App">
      <h1>Demo App for Various Topics</h1>
      <div className="tabmenu">
        {tabOptions.map((tab) => (
          <button key={tab.id}
            className={currentTab === tab.id ? 'active' : ''}
            onClick={() => setCurrentTab(tab.id)}
          >{tab.text}</button>
        ))}
      </div>

      {currentTab === 'basicRendering' && (
        <RenderingMemo counter={counter} increaseCounter={increaseCounter} />
      )}
      {currentTab === 'effectOrNot' && (
        <EffectInLine counter={counter} increaseCounter={increaseCounter}  />
      )}
      {currentTab === 'effectMemo' && (
        <EffectMemo counter={counter} increaseCounter={increaseCounter}  />
      )}
    </div>
  );
}

export default App;
