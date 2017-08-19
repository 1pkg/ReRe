// @flow

import React from 'react';
import * as Redux from 'react-redux';

import * as Model from './../model'
import Trigger from './../actions/trigger'
import * as Actions from './../actions/types';

import Grid from './grid';
import Image from './image';
import ToolBar from './toolbar';

class Main extends React.Component {
  props: {
    task : Model.Task,
    hints: Array<Model.Hint>,
    dispatch: (Model.Action) => void,
  }

  componentWillMount() {
    Trigger.call(this.props.dispatch, Actions.ACTION_INITIALIZE);
  }

  render() {
    if (!this.props.task) {
      return null;
    }

    return (
        <div>
            <Image image={this.props.task.image} />
            <ToolBar hints={this.props.hints} dispatch={this.props.dispatch}/>
            <Grid options={this.props.task.options} dispatch={this.props.dispatch}/>
        </div>
    );
  }
}

export default Redux.connect(
  (state: Model.Task) => state,
  (dispatch: (Model.Action) => void) => {
    return {dispatch};
  },
)(Main);
