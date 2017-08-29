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
          position: 'relative',
        }}>
          <Pinpoint/>
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            textAlign: 'center', transform: 'translateX(-0.125em) translateY(-1.5em)',
            fontSize: '0.5em',
          }}>{
            <Infinite/>
          }</div>
        </div>
      );
    }

    let timestamp: number = Math.floor(new Date().getTime() / 1000);
    return (
      <div style={{
        position: 'relative',
      }}>
        <Pinpoint/>
        <div style={{
          position: 'absolute',
          width: '100%', height: '100%',
          textAlign: 'center', transform: 'translateX(-0.125em) translateY(-1.5em)',
          fontSize: '0.5em',
        }}>{
            Constants.ACT_PROCESS_DURATION - (timestamp - this.props.timestamp)
        }</div>
      </div>
    );
  }
}
