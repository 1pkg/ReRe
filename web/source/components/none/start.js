// @flow

import React from 'react';

import ArrowRight from 'react-icons/lib/io/arrow-right-b'

import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Effects from './../../effects';

export default class Start extends React.Component {
  props: {
    trigger: Trigger,
  }

  start(event: SyntheticEvent) {
    event.preventDefault();

    this.props.trigger.call(Actions.ACTION_INITIALIZE);
  }

  render() {
    return (
      <div style={{
        alignSelf: 'center', flexGrow: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontWeight: 'bold', fontSize: '4em',
      }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
          onMouseOver={Effects.hover}
          onMouseOut={Effects.unhover}
          onClick={this.start.bind(this)}
        >
          <span>START</span>
          &nbsp;
          <ArrowRight/>
        </div>
      </div>
    );
  }
}
