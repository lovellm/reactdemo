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
};

const list = [
'😀',
'😄',
'😁',
'😆',
'🤣',
'🤩',
'😋',
'🤪',
'😝',
'😵',
'😱',
'💩',
'👻',
'👽',
'🍥',
'🍩',
'🧁',
'🥧',
];

export default function RandomEmoji(props) {
  const [char] = useState(list[Math.floor(Math.random() * list.length)]);
  const size = props.fontSize || 32;
  const absolute = 'top' in props || 'left' in props;
  const spin = props.spin ? (
    ('' + (props.speed || 3) + 's')
    + ' linear 0s infinite normal both running spinning'
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
