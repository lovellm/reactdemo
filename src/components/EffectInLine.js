import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RenderCounter from './RenderCounter';
import SlowComponent from './SlowComponent';

const propTypes = {
  counter:         PropTypes.number.isRequired,
  increaseCounter: PropTypes.func.isRequired,
};

const options = [
  { id: 'direct', text: 'Every Time' },
  { id: 'effect', text: 'useEffect' },
];

const speeds = [
  0, 100, 500, 1000
];

// Pretend to make some data derived from other data
const makeList = (x) => {
  const list = [];
  if (!x || x < 1) { return list; }
  for (let i = 0; i < x; i++) {
    list.push(i);
  }
  return list;
}

// Perform the data change using an effect
function AsEffect(props) {
  const [derived, setDerived] = useState(null);
  useEffect(() => {
    setDerived(makeList(props.counter));
  }, [props.counter]);

  return (
    <div className="container">
      <div>Created Derived Data in a useEffect</div>
      <div>List Length: {derived && derived.length}</div>
      {!!props.speed && <SlowComponent name="AsEffect" ms={props.speed} />}
      <RenderCounter />
    </div>
  )
}

// Perform the data change in line
function AsInLine(props) {
  const derived = makeList(props.counter);
  return (
    <div className="container">
      <div>Created Derived Data Directly</div>
      <div>List Length: {derived && derived.length}</div>
      {!!props.speed && <SlowComponent name="Direct" ms={props.speed} />}
      <RenderCounter />
    </div>
  )
}

/* Simulate needing to derive some data for display based on other data we already have or are given.
 * Adds options to pretend the component doing the manipulation is already very slow at rendering.
 * Note: Fake slowness is in component itself, not deriving the data.
 * For slow deriving of data, check out useEffect/ useMemo.
 */
export default function EffectInLine(props) {
  const [currentOption, setCurrentOption] = useState(options[0].id);
  const [currentSpeed, setCurrentSpeed] = useState(speeds[0]);
  return (
    <div>
      <div className="container">
        <p>
          This page demonstrates the rendering difference of deriving data
          using a useEffect vs directly doing it in-line.
        </p>
        <p>
          For example, suppose you receive data in props and you need to sort that data before using it.
          Should you should sort it directly, or sort it within a useEffect and then save it to state?
          In most cases, it probably does not matter, but if your component, or child components,
          are slow to render, it might.
        </p>
        <p>
          This page is simulating such a scenario by making an array derived from the app state counter.
          It also provides options to simulate a slow rendering component.
        </p>
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
          How fast is the Rendering?
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
      {currentOption === 'effect' && <AsEffect {...props} speed={currentSpeed} />}
      {currentOption === 'direct' && <AsInLine {...props} speed={currentSpeed} />}
    </div>
  );
}

EffectInLine.propTypes = propTypes;
