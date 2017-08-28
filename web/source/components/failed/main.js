// @flow

import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

export default class Main extends React.Component {
  props: {
    trigger: Trigger,
  }

  restart(event: SyntheticEvent) {
    event.preventDefault();

    this.props.trigger.call(Actions.ACTION_INITIALIZE);
  }

  render() {
    return (
      <div onClick={this.restart.bind(this)}>
        <a href='#'>restart</a>
      </div>
    );
  }
}
