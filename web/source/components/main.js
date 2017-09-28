// @flow

import React from 'react';
import * as Redux from 'react-redux';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './../actions/trigger';
import * as Actions from './../actions/types';

import None from './none/main';
import Process from './process/main';
import Result from './result/main';

class Main extends React.Component {
  props: {
    trigger: Trigger,
    state: Model.State,
  }

  getScene(status: string) {
    switch(status) {
      case Constants.ACT_STATUS_NONE:
        return (
          <None trigger={this.props.trigger}/>
        );

      case Constants.ACT_STATUS_PROCESS:
        return (
          <Process
            trigger={this.props.trigger}
            task={this.props.state.task}
            assits={this.props.state.assists}
            timestamp={this.props.state.entry.timestamp}
            score={this.props.state.entry.score}
          />
        );

      case Constants.ACT_STATUS_RESULT:
        return (
          <Result
            trigger={this.props.trigger}
            task={this.props.state.task}
            assits={this.props.state.assists}
            score={this.props.state.entry.score}
          />
        );
    }
  }

  render() {
    if (!this.props.state) {
      return null;
    }

    return (
      <div style={{
        color: Constants.COLOR_MAIN, width: '100vw', height: '100vh',
      }}>{
        this.getScene(this.props.state.entry.status)
      }</div>
    );
  }
}

export default Redux.connect(
  (state: Model.State) => {
    return {state};
  },
)(Main);
