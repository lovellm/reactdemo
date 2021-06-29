import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RandomEmoji from './RandomEmoji';

const propTypes = {
  disabled: PropTypes.bool,
  count: PropTypes.number,
};

const defaultProps = {
  count: 30,
};

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
  const timer = useRef(null);

  useEffect(() => {
    if (props.disabled) {
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

  }, [frame, props.disabled, props.count]);

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
    </div>
  );
}

RainingEmoji.propTypes = propTypes;
RainingEmoji.defaultProps = defaultProps;
