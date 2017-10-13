// @flow

import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

import Header from './../shared/header';
import Grid from './../shared/grid';
import Subject from './../shared/subject';
import ToolBar from './../shared/toolbar';

export default class Main extends React.Component {
  props: {
    trigger: Trigger,
    state: Model.State,
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',
        height: '100vh',
      }}>
        <Header
          trigger={this.props.trigger}
          score={this.props.state.score}
        />
        <Subject
          trigger={this.props.trigger}
          subject={this.props.state.task.subject}
          effects={this.props.state.task.effects}
        />
        <ToolBar
          trigger={this.props.trigger}
          assists={this.props.state.assists}
          timestamp={this.props.state.timestamp}
          active={true}
        />
        <Grid
          trigger={this.props.trigger}
          options={this.props.state.task.options}
          option={NaN}
        />
      </div>
    );
  }
}
