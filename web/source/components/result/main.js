// @flow

import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Header from './../shared/header';
import Image from './../shared/image';
import ToolBar from './../shared/toolbar';
import Grid from './../shared/grid';
import Next from './next';

export default class Main extends React.Component {
  props: {
    trigger: Trigger,
    task : Model.Task,
    hints: Array<Model.Hint>,
    score: number,
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',
        height: '100vh',
      }}>
        <Header score={this.props.score}/>
        <Image image={this.props.task.image}/>
        <ToolBar trigger={this.props.trigger} hints={this.props.hints} timestamp={NaN} disabled={true}/>
        <Next trigger={this.props.trigger}/>
        <Grid trigger={this.props.trigger} options={this.props.task.options} image={this.props.task.image}/>
      </div>
    );
  }
}
