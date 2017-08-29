// @flow

import React from 'react';

export default class Header extends React.Component {
  props: {
    score: number,
  }

  render() {
    return (
      <div style={{
        alignSelf: 'flex-end',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        fontWeight: 'bold', fontSize: '2em',
      }}>
        <div>WIT&nbsp;{this.props.score}</div>
      </div>
    );
  }
}
