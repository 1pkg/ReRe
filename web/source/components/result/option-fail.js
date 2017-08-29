// @flow

import React from 'react';

import Close from 'react-icons/lib/io/close-round';

export default class OptionFail extends React.Component {
  props: {
    children: string,
  }

  render() {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0.2em 0em 0.2em 0em', color: 'red',
      }}>
        <span>{this.props.children}</span>
        &nbsp;
        <Close/>
      </div>
    );
  }
}
