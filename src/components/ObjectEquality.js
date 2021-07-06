/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import RenderCounter from './RenderCounter';

export default function ObjectEquality() {
  const [myState, setMyState] = useState({ counter: 0 });

  return (
    <div>
      <div className="container">
        <p>
          This page explains how equality is determined when receiving props.
        </p>
        <p>
          Things such as React.memo, useEffect, useMemo, and useState compare
          previous value to next value to determine if an update needs to happen.
          This is done using <code>Object.is</code> equality checks,
          which is practically equivalent to <code>===</code> equality checks.
        </p>
        <p>
          Open the console to run these examples and see the difference.
        </p>

        <p>
          Numbers and strings use simple equality checks and behave as you would expect.
        </p>
        <div className="code">
          var number1 = 5;{'\n'}
          var number2 = 5;{'\n'}
          number1 === number2; // true{'\n'}
        </div>
        <br />
        <div className="code">
          var string1 = 'Hello';{'\n'}
          var string2 = 'Hello';{'\n'}
          string1 === string2; // true{'\n'}
        </div>

        <p>
          Falsey values are equal to themselves, but are different from each other.
        </p>
        <div className="code">
          null === null; // true{'\n'}
          undefined === undefined; // true{'\n'}
          '' === ''; // true{'\n'}
          null === undefined; // false{'\n'}
        </div>

        <p>
          The important thing for performance optimization is Objects and Arrays.
          They use Referential Equality. The same instance is equal,
          but a different instance, even with same values, is not equal.
        </p>
        <div className="code">
          var object1 = {JSON.stringify({test: 'hello'})};{'\n'}
          var object2 = object1;{'\n'}
          object1 === object2; // true{'\n'}
          var object3 = {JSON.stringify({test: 'hello'})};{'\n'}
          object1 === object3; // false{'\n'}
          object1 === {JSON.stringify({test: 'hello'})}; // false{'\n'}
          var emptyObject = {JSON.stringify({})};{'\n'}
          emptyObject === {JSON.stringify({})}; // false{'\n'}
        </div>
        <br />
        <div className="code">
          var array1 = [0, 1];{'\n'}
          var array2 = array1;{'\n'}
          array1 === array2; // true{'\n'}
          array1 === [0, 1]; // false{'\n'}
          var array3 = [0, 1];{'\n'}
          array1 === array3; // false{'\n'}
          var emptyArray = [];{'\n'}
          emptyArray === []; // false{'\n'}
        </div>

        <p>
          The differences between <code>Object.is</code> and <code>===</code>
          are related to signed zero and NaN.
          You probably should not be relying on those for props,
          which is why they are practically the same.
        </p>
        <p>
          For more details, see the
          <a target="_blank" rel="noreferrer"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness"
          > Mozilla Developer Docs
          </a>
        </p>
      </div>

      <div className="container">
        <p>
          Pretend you have a counter variable inside an object
          and you want to increment it by clicking a button.
        </p>
        <p>
          Counter inside Object: {myState.counter}
        </p>
        <div>
          This button will increment the counter in the state and then
          set the state back to itself. Do you see the problem?
          <br />
          <button onClick={() => {
            myState.counter += 1;
            setMyState(myState);
          }}>Bad Incrementing</button>
          <div className="code">
            myState.counter += 1;{'\n'}
            setMyState(myState);
          </div>
        </div>
        <br />
        <div>
          This button will increment the counter in the state and then
          set the state to a copy of itself.
          <br />
          <button onClick={() => {
            myState.counter += 1;
            setMyState({...myState});
          }}>Better Incrementing</button>
          <div className="code">
            myState.counter += 1;{'\n'}
            setMyState({'{...myState}'});
          </div>
        </div>
        <br />
        <p>
          If <code>myState</code> contains only the counter,
          it would be best to store it as a number, not an object.
          <br />
          Assuming it has more than just a counter, the best solution
          would probably be to <code>useReducer</code> instead of <code>useState</code>
        </p>
        <RenderCounter />
      </div>
    </div>
  );
}
