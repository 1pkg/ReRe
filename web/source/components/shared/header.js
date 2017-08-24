// @flow

import React from 'react';

export default class Header extends React.Component {
  props: {
    count: number,
  }

  render() {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      }}>
        <div style={{
          fontWeight: 'bold', fontSize: '1.5em',
        }}>WIT&nbsp;&nbsp;&nbsp;{this.props.count}</div>
      </div>
    );
  }
}
