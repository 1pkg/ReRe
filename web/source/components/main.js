// @flow

import React from 'react';
import * as Redux from 'react-redux';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './../actions/trigger';
import * as Actions from './../actions/types';

import None from './none/main';
import Preview from './preview/main';
import Process from './process/main';
import Result from './result/main';

class Main extends React.Component {
  props: {
    trigger: Trigger,
    state: Model.State,
  }

  view(status: string) {
    if (!status) {
      return (
        <None trigger={this.props.trigger}/>
      );
    }

    switch(status) {
      case Constants.STATUS_PREVIEW:
        return (
          <Preview trigger={this.props.trigger} state={this.props.state}/>
        );

      case Constants.STATUS_PROCESS:
        return (
          <Process trigger={this.props.trigger} state={this.props.state}/>
        );

      case Constants.STATUS_RESULT:
        return (
          <Result trigger={this.props.trigger} state={this.props.state}/>
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
        this.view(this.props.state.status)
      }</div>
    );
  }
}

export default Redux.connect(
  (state: Model.State) => {
    return {state};
  },
)(Main);
