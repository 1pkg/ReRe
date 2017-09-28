// @flow

import React from 'react';

import Trigger from './../../actions/trigger';

import Header from './../shared/header';
import Start from './start';
import Share from './share';

export default class Main extends React.Component {
  props: {
    trigger: Trigger,
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',
        height: '100vh',
      }}>
        <Header score={0}/>
        <Start trigger={this.props.trigger}/>
        <Share/>
      </div>
    );
  }
}
