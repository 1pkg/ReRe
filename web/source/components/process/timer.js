// @flow

import React from 'react';

import Time from 'react-icons/lib/io/pinpoint';

export default class Timer extends React.Component {
  props: {
    time: number,
  }

  render() {
    if (!Number.isFinite(this.props.time)) {
      return <div></div>;
    }

    return (
      <div style={{
        position: 'relative',
      }}>
        <Time />
        <div style={{
          position: 'absolute',
          width: '100%', height: '100%',
          textAlign: 'center', transform: 'translateX(-0.125em) translateY(-1.5em)',
          fontSize: '0.5em',
        }}>{
            this.props.time
        }</div>
      </div>
    );
  }
}
