// @flow

import React from 'react';

import ArrowRight from 'react-icons/lib/io/arrow-right-b'

import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Effects from './../../effects';

export default class Next extends React.Component {
  props: {
    trigger: Trigger,
  }

  restart(event: SyntheticEvent) {
    event.preventDefault();

    this.props.trigger.call(Actions.ACTION_SPLASH);
  }

  render() {
    return (
      <div style={{
        alignSelf: 'flex-end', flexGrow: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
          onMouseOver={Effects.hover}
          onMouseOut={Effects.unhover}
          onClick={this.restart.bind(this)}
        >
          <span>NEXT</span>
          &nbsp;
          <ArrowRight/>
        </div>
      </div>
    );
  }
}
