// @flow

import React from 'react';

import Pinpoint from 'react-icons/lib/io/pinpoint';
import Infinite from 'react-icons/lib/io/ios-infinite';

import * as Constants from './../../constants';

export default class Timer extends React.Component {
  props: {
    timestamp: number,
  }

  render() {
    if (isNaN(this.props.timestamp)) {
      return (
        <div style={{
          position: 'relative', color: Constants.COLOR_CORRECT,
        }}>
          <Pinpoint/>
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            textAlign: 'center', transform: 'translateX(-0.125em) translateY(-1.6em)',
            fontSize: '0.5em',
          }}>{
            <Infinite/>
          }</div>
        </div>
      );
    }

    let timestamp: number = Math.floor(new Date().getTime() / 1000);
    let difftimestamp: number = Constants.PROCESS_DURATION - (timestamp - this.props.timestamp);
    return (
      <div style={{
        position: 'relative',
        color: (difftimestamp <= Constants.PROCESS_DURATION_WARNING ? Constants.COLOR_FAIL : Constants.COLOR_MAIN),
      }}>
        <Pinpoint/>
        <div style={{
          position: 'absolute',
          width: '100%', height: '100%',
          textAlign: 'center', transform: 'translateX(-0.125em) translateY(-1.5em)',
          fontSize: '0.5em',
        }}>{
            difftimestamp
        }</div>
      </div>
    );
  }
}
