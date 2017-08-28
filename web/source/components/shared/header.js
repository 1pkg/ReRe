// @flow

import React from 'react';

export default class Header extends React.Component {
  props: {
    count: number,
  }

  render() {
    return (
      <div style={{
        alignSelf: 'flex-end',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        fontWeight: 'bold', fontSize: '2em',
      }}>
        <div>WIT&nbsp;{this.props.count}</div>
      </div>
    );
  }
}
