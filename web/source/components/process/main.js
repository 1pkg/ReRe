// @flow

import React from 'react';

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Actions from './../../actions/types';

import Header from './../shared/header';
import Grid from './grid';
import Image from './image';
import ToolBar from './toolbar';

export default class Main extends React.Component {
  props: {
    task : Model.Task,
    hints: Array<Model.Hint>,
    time: number,
    count: number,
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        height: '100vh',
      }}>
        <Header count={this.props.count} />
        <Image image={this.props.task.image} />
        <ToolBar hints={this.props.hints} time={this.props.time} />
        <Grid options={this.props.task.options }/>
      </div>
    );
  }
}
