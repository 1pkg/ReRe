// @flow

import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Header from './../shared/header';
import Grid from './../shared/grid';
import Image from './../shared/image';
import ToolBar from './../shared/toolbar';

export default class Main extends React.Component {
  props: {
    trigger: Trigger,
    task : Model.Task,
    hints: Array<Model.Hint>,
    timestamp: number,
    score: number,
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',
        height: '100vh',
      }}>
        <Header score={this.props.score}/>
        <Image subject={this.props.task.subject} effected={true}/>
        <ToolBar trigger={this.props.trigger} hints={this.props.hints} timestamp={this.props.timestamp} disabled={false}/>
        <Grid trigger={this.props.trigger} options={this.props.task.options} correctOption={-1}/>
      </div>
    );
  }
}
