import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RandomEmoji from './RandomEmoji';
import './RainingEmoji.css';

const propTypes = {
  /** If True, its raining */
  raining: PropTypes.bool,
  /** Max number of drops */
  count: PropTypes.number,
  /** If true, hide the toggle button. Will need to control via raining. */
  hideButton: PropTypes.bool,
};

const defaultProps = {
  count: 30,
};

const toggleReducer = (state) => !state;
const incrementReducer = (state) => state + 1;
const rainingReducer = (state, ops) => {
  const nextState = [];
  if (ops === false) { return nextState; }
  const options = ops || {};
  const now = Date.now();
  (state || []).forEach((drop) => {
    if (drop.expires > now) {
      nextState.push(drop);
    }
  });
  if (nextState.length <= options.count) {
    const life = Math.floor(Math.random() * 15) + 3;
    const speed = Math.floor(Math.random() * 4) + 1;
    const left = Math.floor(Math.random() * 90) + 5;
    nextState.push({
      expires: now + (life * 1000),
      component: (
        <RandomEmoji fall spin
          life={life} speed={speed} key={now}
          top={0} left={left + 'vw'}
        />
      ),
    });
  }

  return nextState
}

export default function RainingEmoji(props) {
  const [frame, nextFrame] = useReducer(incrementReducer, 0);
  const [rain, makeItRain] = useReducer(rainingReducer, []);
  const [raining, toggleRaining] = useReducer(toggleReducer, false);
  const timer = useRef(null);
  const disabled = !props.raining && !raining;

  useEffect(() => {
    if (disabled) {
      if (timer.current) { clearTimeout(timer.current); }
      makeItRain(false);
      return undefined;
    }
    const timerId = setTimeout(() => {
      makeItRain({
        count: props.count
      });
      nextFrame();
    }, 100);
    timer.current = timerId;

    return () => {
      clearTimeout(timerId);
    }

  }, [frame, disabled, props.count]);

  return (
    <div
      style={{
        position: 'fixed',
        top:      0,
        left:     0,
        zIndex:   100,
      }}
    >
      {rain.map((drop) => (
        drop.component
      ))}
      {!props.hideButton && (
        <div
          style={{
            position: 'fixed',
            bottom: '0vh', right: '0vw',
            fontSize: '8px',
            cursor: 'pointer',
          }}
          onClick={toggleRaining}
        >😋</div>
      )}
    </div>
  );
}

RainingEmoji.propTypes = propTypes;
RainingEmoji.defaultProps = defaultProps;
