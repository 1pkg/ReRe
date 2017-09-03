// @flow

import React from 'react';

import Checkmark from 'react-icons/lib/io/checkmark-round';

import * as Constants from './../../constants';

export default class OptionCorrect extends React.Component {
  props: {
    children: string,
  }

  render() {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0.2em 0em 0.2em 0em', color: Constants.COLOR_CORRECT,
      }}>
        <span>{this.props.children}</span>
        &nbsp;
        <Checkmark/>
      </div>
    );
  }
}
