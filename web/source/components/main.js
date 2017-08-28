// @flow

import React from 'react';
import * as Redux from 'react-redux';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './../actions/trigger';
import * as Actions from './../actions/types';

import Splash from './splash/main';
import Process from './process/main';
import Failed from './failed/main';

class Main extends React.Component {
  props: {
    trigger: Trigger,
    state: Model.State,
  }

  render() {
    if (!this.props.state || !this.props.state.task) {
      return (
        <Splash trigger={this.props.trigger}/>
      );
    }

    switch(this.props.state.act.status) {
        case Constants.ACT_STATUS_PROCESS:
          return (
            <Process
              trigger={this.props.trigger}
              task={this.props.state.task}
              hints={this.props.state.hints}
              time={this.props.state.act.time}
              count={this.props.state.act.count}
            />
          );

        case Constants.ACT_STATUS_FAILED:
          return (
            <Failed trigger={this.props.trigger}/>
          );
    }
  }
}

export default Redux.connect(
  (state: Model.State) => {
    return {state};
  },
)(Main);
