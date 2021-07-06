import React, { useReducer, useState } from 'react';
import _ from 'lodash';
import StateVariableButton from './components/StateVariableButton';
import RenderingMemo from './components/RenderingMemo';
import EffectInLine from './components/EffectInLine';
import EffectMemo from './components/EffectMemo';
import ObjectEquality from './components/ObjectEquality';
import RainingEmoji from './components/RainingEmoji/RainingEmoji';
import './App.css';

// Assumes state is number, returns increment of it
const incrementReducer = (state) => state + 1;

// Tabs / Pages
const tabOptions = [
  { id: 'basicRendering', text: 'App State / Rendering' },
  { id: 'effectOrNot', text: 'useEffect / In-line' },
  { id: 'effectMemo', text: 'useEffect / useMemo' },
  { id: 'objectEquality', text: 'Prop / State Equality', hideCounter: true },
];

function App() {
  const [currentTab, setCurrentTab] = useState(tabOptions[0].id);
  const [counter, increaseCounter] = useReducer(incrementReducer, 0);
  const currentTabInfo = _.find(tabOptions, { id: currentTab }) || {};

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

      {!currentTabInfo.hideCounter && (
        <div className="container">
          <StateVariableButton counter={counter} increaseCounter={increaseCounter} />
        </div>
      )}

      {currentTab === 'basicRendering' && (
        <RenderingMemo counter={counter} />
      )}
      {currentTab === 'effectOrNot' && (
        <EffectInLine counter={counter} />
      )}
      {currentTab === 'effectMemo' && (
        <EffectMemo />
      )}
      {currentTab === 'objectEquality' && (
        <ObjectEquality />
      )}

      {/* Just for fun.. */}
      <RainingEmoji count={50}/>
    </div>
  );
}

export default App;
