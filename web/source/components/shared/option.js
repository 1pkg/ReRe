// @flow

import React from 'react';
import Lodash from 'lodash';

import Checkmark from 'react-icons/lib/io/checkmark-round';
import Close from 'react-icons/lib/io/close-round';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

export default class Option extends React.Component {
  props: {
    children: string,
    trigger: Trigger,
    option: number,
    result: ?bool,
  }

  render() {
    if (Lodash.isNil(this.props.result)) {
      let action: any = this.props.trigger.call.bind(
        this.props.trigger,
        Actions.ACTION_CHOSE,
        this.props.option
      )
      return (
        <div style={{
          padding: '0.2em 0em 0.2em 0em', color: Constants.COLOR_MAIN,
        }} onClick={action}
        >{this.props.children}</div>
      )
    } else if (this.props.result) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0.2em 0em 0.2em 0em', color: Constants.COLOR_CORRECT,
        }}>
          <span>{this.props.children}</span>
          &nbsp;
          <Checkmark/>
        </div>
      )
    } else {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0.2em 0em 0.2em 0em', color: Constants.COLOR_FAIL,
        }}>
          <span>{this.props.children}</span>
          &nbsp;
          <Close/>
        </div>
      )
    }
  }
}
