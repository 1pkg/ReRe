// @flow

import React from 'react';

import * as Constants from './../../constants';
import * as Effects from './../../effects';

export default class Option extends React.Component {
  props: {
    children: string,
    index: number,
    chose: (event: SyntheticEvent) => void,
  }

  render() {
    return (
      <div style={{
        padding: '0.2em 0em 0.2em 0em', color: Constants.COLOR_MAIN,
      }}
        onMouseOver={Effects.hover}
        onMouseOut={Effects.unhover}
        onClick={this.props.chose}
        data-index={this.props.index}
      >{
        this.props.children
      }</div>
    );
  }
}
