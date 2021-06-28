import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  // Render without color blocks
  simple: PropTypes.bool,
}

const colors = [
  '#2e91e5',
  '#e15f99',
  '#1ca71c',
  '#fb0d0d',
  '#da16ff',
  '#267E5E',
  '#b68100',
  '#750d86',
  '#eb663b',
  '#511cfb',
];

export default function RenderCounter(props) {
  const count = useRef(0);
  const {
    simple,
  } = props;

  const index = count.current % colors.length;
  const color = colors[index];

  // Happens every time a render is committed to DOM
  // In PROD, should be same as every time function runs
  // In DEV, <React.StrictMode> causes function to run twice per render
  useLayoutEffect(() => {
    count.current += 1;
  });

  return (
    <div className="renderCounter">
      <div style={{ backgroundColor: color }}>{count.current + 1}</div>
      {!simple && colors.map((blockColor, i) => (
        <div key={blockColor} className='colorBlock'
          style={{ backgroundColor: blockColor, border: i === index ? '2px solid black' : undefined }}
        ></div>
      ))}
    </div>
  );
}

RenderCounter.propTypes = propTypes;

// Memoize component to only re-render if props change
// Functional component equivalent of class React.SimpleComponent
export const RenderCounterMemo = React.memo(RenderCounter);
