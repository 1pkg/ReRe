// @flow

import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Header from './../shared/header';
import Grid from './grid';
import Image from './image';
import ToolBar from './toolbar';

export default class Main extends React.Component {
  props: {
    trigger: Trigger,
    task : Model.Task,
    hints: Array<Model.Hint>,
    time: number,
    count: number,
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',
        height: '100vh',
      }}>
        <Header count={this.props.count} />
        <Image image={this.props.task.image} />
        <ToolBar trigger={this.props.trigger} hints={this.props.hints} time={this.props.time} />
        <Grid trigger={this.props.trigger} options={this.props.task.options}/>
      </div>
    );
  }
}
