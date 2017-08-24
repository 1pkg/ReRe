// @flow

import React from 'react';

import * as Effects from './../../effects';

export default class Option extends React.Component {
  props: {
    children: string,
    id: number,
    chose: (event: Event) => void,
  }

  render() {
    return (
      <div style={{
        padding: '0.25em 0em 0.25em 0em',
      }}
        onMouseOver={Effects.hover}
        onMouseOut={Effects.unhover}
        onClick={this.props.chose}
        data-id={this.props.id}
      >{
        this.props.children
      }</div>
    );
  }
}
