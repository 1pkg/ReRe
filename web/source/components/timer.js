// @flow

import React from 'react';

import timer from './../../static/timer.png';

export default class Timer extends React.Component {
  props: {
    time: number,
  }

  render() {
    return (
      <div style={{
        position: 'relative', height: '100%',
      }}>
        <img style={{
          height: '100%', objectFit: 'contain',
        }} src={timer}/>
        <div style={{
          width: '100%', height: '100%', position: 'absolute', textAlign: 'center',
          top: '50%', left: '50%',
          transform: 'translateX(-50%) translateY(-10%)',
          fontSize: '2vh',
        }}>{
            this.props.time
        }</div>
      </div>
    );
  }
}
