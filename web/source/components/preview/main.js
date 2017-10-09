// @flow

import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

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
      </div>
    );
  }
}
