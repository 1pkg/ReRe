// @flow

import React from 'react';

import * as Constants from './../../constants';

import Redo from 'react-icons/lib/io/loop';
import Infinite from 'react-icons/lib/io/ios-infinite';
import Reduce from 'react-icons/lib/io/arrow-swap';
import Stats from 'react-icons/lib/io/stats-bars';
import Skip from 'react-icons/lib/io/forward';
import Help from 'react-icons/lib/io/help';

import * as Effects from './../../effects';

const Icons = {
  [Constants.HINT_NAME_REDO]: Redo,
  [Constants.HINT_NAME_INFINITE]: Infinite,
  [Constants.HINT_NAME_REDUCE]: Reduce,
  [Constants.HINT_NAME_STATS]: Stats,
  [Constants.HINT_NAME_SKIP]: Skip,
  [Constants.HINT_NAME_HELP]: Help,
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
