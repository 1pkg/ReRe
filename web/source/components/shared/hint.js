// @flow

import React from 'react';

import redo from 'react-icons/lib/io/loop';
import infinite from 'react-icons/lib/io/ios-infinite';
import reduce from 'react-icons/lib/io/arrow-swap';
import stats from 'react-icons/lib/io/stats-bars';
import skip from 'react-icons/lib/io/forward';
import help from 'react-icons/lib/io/help';

import * as Effects from './../../effects';

const Icons: {
  redo: React.Component<any>,
  infinite: React.Component<any>,
  reduce: React.Component<any>,
  stats: React.Component<any>,
  skip: React.Component<any>,
  help: React.Component<any>,
} = {
  redo,
  infinite,
  reduce,
  stats,
  skip,
  help,
};

export default class Hint extends React.Component {
  props: {
    id: number,
    name: string,
    disabled: boolean,
    use: (event: SyntheticEvent) => void,
  }

  render() {
    if (!(this.props.name in Icons)) {
      return null;
    }

    let HintIcon: any = Icons[this.props.name];

    if (this.props.disabled) {
      return (
        <span>
          <HintIcon/>
        </span>
      );
    }

    return (
      <span
        onMouseOver={Effects.hover}
        onMouseOut={Effects.unhover}
        onClick={this.props.use}
        data-id={this.props.id}
      >
        <HintIcon/>
      </span>
    );
  }
}
