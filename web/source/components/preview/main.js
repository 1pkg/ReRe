// @flow

import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

import Header from './../shared/header';
import Grid from './../shared/grid';
import ToolBar from './../shared/toolbar';
import Spinner from './spinner';

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
        <Spinner trigger={this.props.trigger}/>
        <ToolBar
          trigger={this.props.trigger}
          assists={this.props.state.assists}
          timestamp={NaN}
          active={false}
        />
        <Grid
          trigger={this.props.trigger}
          options={[]}
          option={NaN}
        />
      </div>
    );
  }
}
