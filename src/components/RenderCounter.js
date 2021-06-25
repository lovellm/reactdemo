import React, { useRef, useLayoutEffect } from 'react';

const colors = [
  '#2e91e5',
  '#e15f99',
  '#1ca71c',
  '#fb0d0d',
  '#da16ff',
  '#363E3E',
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
    <div className='renderCounter'
      style={{
        backgroundColor: color || undefined,
        
      }}
    >
      <div>{count.current + 1}</div>
      {!simple && colors.map((blockColor, i) => (
        <div key={blockColor} className='colorBlock'
          style={{ backgroundColor: blockColor, border: i === index ? '2px solid black' : 'none' }}
        />
      ))}
    </div>
  );
}

export const RenderCounterMemo = React.memo(RenderCounter);
