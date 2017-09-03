// @flow

import React from 'react';
import * as Redux from 'react-redux';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './../actions/trigger';
import * as Actions from './../actions/types';

import Splash from './splash/main';
import Process from './process/main';
import Result from './result/main';

class Main extends React.Component {
  props: {
    trigger: Trigger,
    state: Model.State,
  }

  getScene(status: string) {
    switch(status) {
      case Constants.ACT_STATUS_SPLASH:
        return (
          <Splash trigger={this.props.trigger}/>
        );

      case Constants.ACT_STATUS_PROCESS:
        return (
          <Process
            trigger={this.props.trigger}
            task={this.props.state.task}
            hints={this.props.state.hints}
            timestamp={this.props.state.act.timestamp}
            score={this.props.state.act.score}
          />
        );

      case Constants.ACT_STATUS_RESULT:
        return (
          <Result
            trigger={this.props.trigger}
            task={this.props.state.task}
            hints={this.props.state.hints}
            score={this.props.state.act.score}
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
        this.getScene(this.props.state.act.status)
      }</div>
    );
  }
}

export default Redux.connect(
  (state: Model.State) => {
    return {state};
  },
)(Main);
