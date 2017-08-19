// @flow

import React from 'react';

export default class Option extends React.Component {
  props: {
    children: string,
    id: number,
    chose: (event: Event) => void,
  }

  render() {
    return (
      <p style={{
        width: '33%', textAlign: 'center', verticalAlign: 'center',
        fontSize: '3vh', fontWeight: 'bold',
      }} onClick={this.props.chose} data-id={this.props.id}>{
        this.props.children
      }</p>
    );
  }
}
