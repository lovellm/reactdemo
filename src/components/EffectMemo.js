import React, {
  useEffect, useState, useMemo, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import RenderCounter from './RenderCounter';
import { fakeDataProcess, fakeDataProcessAsync } from './fakeDataProcess';

const propTypes = {
  counter:         PropTypes.number.isRequired,
  increaseCounter: PropTypes.func.isRequired,
};

// Simple Boolean Toggle Reducer
const toggleReducer = (state) => !state;

const options = [
  { id: 'direct', text: 'Every Time' },
  { id: 'effect', text: 'useEffect' },
  { id: 'memo', text: 'useMemo' },
  { id: 'effectAsync', text: 'Async useEffect' },
];

const speeds = [
  0, 100, 500, 1000, 2000,
];

function AsDirect(props) {
  const data = fakeDataProcess(props.speed);
  return (
    <div>
      Fake Data: {data}
      <RenderCounter />
    </div>
  );
}

function AsEffect(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(fakeDataProcess(props.speed));
  }, [props.speed, props.calcAgain]);
  
  return (
    <div>
      Fake Data: {data}
      <RenderCounter />
    </div>
  );
}

function AsMemo(props) {
  const data = useMemo(
    () => fakeDataProcess(props.speed, props.calcAgain),
    [props.speed, props.calcAgain]
  );
  
  return (
    <div>
      Fake Data: {data}
      <RenderCounter />
    </div>
  );
}

function AsEffectAsync(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fakeDataProcessAsync(props.speed).then((nextData) => setData(nextData));
  }, [props.speed, props.calcAgain]);
  
  return (
    <div>
      Fake Data: {data}
      <RenderCounter />
    </div>
  );
}

export default function EffectMemo() {
  const [currentOption, setCurrentOption] = useState(options[0].id);
  const [currentSpeed, setCurrentSpeed] = useState(speeds[0]);
  const [calcAgain, toggleCalcAgain] = useReducer(toggleReducer, false);

  return (
    <div>
      <div className="container">
        <p>
          This page demonstrates running a slow computation in a
          useEffect vs a useMemo vs every time.
          You can choose how slow the data processing is and then observe the difference in user experience.
        </p>
          <ul>
            <li>
              Every Time: Does the data processing on every render
            </li>
            <li>
              useEffect: Performs the data processing in a useEffect and saves to state
            </li>
            <li>
              useMemo: Performs the data processing in a useMemo
            </li>
            <li>
              Async useEffect: Converts the data processing to an async function and runs it in a useEffect
            </li>
          </ul>
        <p>
          The "data processing" in this example just makes a random number.
          Use the Calculate Again button to change deps and run it again for options
          other than Every Time.
        </p>
        <div style={{ marginBottom: '1rem'}}>
          <button onClick={toggleCalcAgain}>Calculate Again</button>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          Which Option to Use?
          <div className="tabmenu">
            {options.map((option) => (
              <button key={option.id}
                className={currentOption === option.id ? 'active' : ''}
                onClick={() => setCurrentOption(option.id)}
              >{option.text}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          How fast is the Data Processing?
          <div className="tabmenu">
            {speeds.map((speed) => (
              <button key={speed}
                className={currentSpeed === speed ? 'active' : ''}
                onClick={() => setCurrentSpeed(speed)}
              >{speed + 'ms'}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {currentOption === 'direct' && <AsDirect speed={currentSpeed} calcAgain={calcAgain} />}
        {currentOption === 'effect' && <AsEffect speed={currentSpeed} calcAgain={calcAgain} />}
        {currentOption === 'memo' && <AsMemo speed={currentSpeed} calcAgain={calcAgain} />}
        {currentOption === 'effectAsync' && <AsEffectAsync speed={currentSpeed} calcAgain={calcAgain} />}
      </div>
    </div>
  );
}

EffectMemo.propTypes = propTypes;
