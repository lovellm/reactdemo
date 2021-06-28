import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  counter:         PropTypes.number.isRequired,
  increaseCounter: PropTypes.func.isRequired,
};

export default function StateVariableButton(props) {
  const {
    counter,
    increaseCounter,
  } = props;

  return (
    <div>
      State Variable in App: {counter}
      <button onClick={increaseCounter}>Increase</button>
    </div>
  );
}

StateVariableButton.propTypes = propTypes;
