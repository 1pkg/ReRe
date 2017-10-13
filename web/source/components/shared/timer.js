// @flow

import React from 'react';
import Lodash from 'lodash';

import Pinpoint from 'react-icons/lib/io/pinpoint';
import Infinite from 'react-icons/lib/io/ios-infinite';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

export default class Timer extends React.Component {
  props: {
    trigger: Trigger,
    timestamp: number,
  }

  render() {
    if (Lodash.isNaN(this.props.timestamp)) {
      return (
        <div style={{position: 'relative',}}>
          <Pinpoint/>
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            textAlign: 'center', transform: 'translateX(-0.125em) translateY(-1.6em)',
            fontSize: '0.5em',
          }}>{<Infinite/>}</div>
        </div>
      );
    } else {
      let difftimestamp: number = this.props.trigger.timestamp() - this.props.timestamp;
      difftimestamp = Constants.PROCESS_DURATION - difftimestamp;
      let color: string = difftimestamp <= Constants.PROCESS_DURATION_WARNING ? Constants.COLOR_FAIL : Constants.COLOR_MAIN;
      return (
        <div style={{position: 'relative',}}>
          <Pinpoint/>
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            textAlign: 'center', transform: 'translateX(-0.125em) translateY(-1.5em)',
            fontSize: '0.5em',
            color: color,
          }}>{difftimestamp}</div>
        </div>
      );
    }
  }
}
