import React from 'react';
import PropTypes from 'prop-types';
import RenderCounter, { RenderCounterMemo } from './RenderCounter';
import StateVariableButton from './StateVariableButton';

const propTypes = {
  counter:         PropTypes.number.isRequired,
  increaseCounter: PropTypes.func.isRequired,
};

export default function RenderingMemo(props) {
  const {
    counter
  } = props;

  return (
    <div className="container" style={{ marginBottom: '0.5rem' }}>
      <StateVariableButton {...props} />
      <div
        style={{
          display:    'flex',
          flexFlow:   'column nowrap',
          alignItems: 'flex-start',
        }}
      >
        <p>
          This page simply shows how things are rendered when the parent component is rendered.
        </p>
        <div>Renders any time parent renders or anytime state or props render (default)</div>
        <RenderCounter />
        <div>Only renders once (React.memo)</div>
        <RenderCounterMemo/>
        <div>Renders every 3 counter changes. Resets every 12 counter changes (React.memo)</div>
        <RenderCounterMemo test={Math.floor(counter/3)} key={Math.floor(counter/12)} />
      </div>
    </div>
  );
}

RenderingMemo.propTypes = propTypes;
