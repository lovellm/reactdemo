import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  spin: PropTypes.bool,
  fall: PropTypes.bool,
  fontSize: PropTypes.number,
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  top: PropTypes.number,
  speed: PropTypes.number,
  life: PropTypes.number,
  reverse: PropTypes.bool,
};

const list = [
'ð',
'ð',
'ð',
'ð',
'ðĪĢ',
'ðĪĐ',
'ð',
'ðĪŠ',
'ð',
'ðĩ',
'ðą',
'ðĐ',
'ðŧ',
'ð―',
'ðĨ',
'ðĐ',
'ð§',
'ðĨ§',
];

export default function RandomEmoji(props) {
  const [char] = useState(list[Math.floor(Math.random() * list.length)]);
  const size = props.fontSize || 32;
  const absolute = 'top' in props || 'left' in props;
  const direction = props.reverse ? 'reverse' : 'normal';
  const spin = props.spin ? (
    ('' + (props.speed || 3) + 's')
    + ' linear 0s infinite '
    + direction + ' both running spinning'
  ) : '';
  const fall = props.fall ? (
    ('' + (props.life || 6) + 's')
    + ' linear 0s 1 normal forwards running falling'
  ) : '';
  return (
    <div
      style={{
        position:       absolute ? 'absolute' : 'relative',
        top:            props.top,
        left:           props.left,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          size + 'px',
        height:         size + 'px',
        fontSize:       size + 'px',
        animation:      spin + (spin && fall ? ', ' : '') + fall,
        // animationName:  animationName,
        // animationDuration: animationDuration,
        // animationTimingFunction: animationTimingFunction,
        // animationIterationCount: animationIterationCount,
      }}
    >
      {char}
    </div>
  )
}

RandomEmoji.propTypes = propTypes;
