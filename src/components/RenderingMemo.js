import React from 'react';
import PropTypes from 'prop-types';
import RenderCounter, { RenderCounterMemo } from './RenderCounter';

const propTypes = {
  counter:         PropTypes.number.isRequired,
  increaseCounter: PropTypes.func.isRequired,
};

export default function RenderingMemo(props) {
  const {
    counter
  } = props;

  return (
    <div className="container">
      <p>
        This page simply shows how things are rendered when the parent component is rendered.
      </p>
      <p>
        By default, a component will render any time its parent renders
        or any time a state variable, props, or used context changes.
      </p>
      <RenderCounter />
      <p>
        By using React.memo, you can prevent re-renders when the parent renders
        unless there are new props. It will still render if state or used context changes.
      </p>
      <RenderCounterMemo/>
      <p>
        Providing a different props will cause a re-render.
        Here, every 3 counter intervals are received as a different prop.
        Also, if the "key" prop changes it will fully reset the component to a new instance,
        resetting all state and refs.
      </p>
      <RenderCounterMemo test={Math.floor(counter/3)} key={Math.floor(counter/12)} />
    </div>
  );
}

RenderingMemo.propTypes = propTypes;
