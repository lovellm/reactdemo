import React from 'react';
import { fakeDataProcess } from './fakeDataProcess';

export default function SlowComponent(props) {
  const start = Date.now();
  const name = props.name ? props.name + ' ' : '';
  fakeDataProcess(+props.ms);

  return <div>{name + 'Rendered in ' + (Date.now() - start) + 'ms'}</div>;
}