// @flow

import React from 'react';
import * as Redux from 'react-redux';

import * as Model from './../model'
import Trigger from './../actions/trigger'
import * as Actions from './../actions/types';

import Splash from './splash/main';
import Process from './process/main';
import Failed from './failed/main';

class Main extends React.Component {
  props: {
    state : Model.State,
  }

  render() {
    if (!this.props.state) {
      return (
        <Splash />
      );
    }

    switch(this.props.state.act.status) {
        case Model.ACT_STATUS_PROCESS:
          return (
            <Process
              task={this.props.state.task}
              hints={this.props.state.hints}
              time={this.props.state.act.time}
              count={this.props.state.act.count}
            />
          );

        case Model.ACT_STATUS_FAILED:
          return (
            <Failed />
          );
    }
  }
}

export default Redux.connect(
  (state: Model.State) => {
    return {state};
  },
)(Main);
