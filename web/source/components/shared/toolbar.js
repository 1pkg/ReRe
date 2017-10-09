// @flow

import React from 'react';
import DeepEqual from 'deep-equal';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Assit from './assit';
import Timer from './timer';

export default class Toolbar extends React.Component {
  props: {
    trigger: Trigger,
    assists: Array<string>,
    timestamp: number,
    disabled: boolean,
  }

  shouldComponentUpdate(props: {
    trigger: Trigger,
    assists: Array<string>,
    timestamp: number,
    disabled: boolean,
  }) {
    let timestamp: number = Math.floor(new Date().getTime() / 1000);
    return !DeepEqual(props, this.props)
      || timestamp != this.props.timestamp;
  }

  use(event: SyntheticEvent) {
    let target: EventTarget = event.currentTarget;
    if (target instanceof HTMLElement) {
      let assist: number = Number.parseInt(target.dataset.assist);
      this.props.trigger.call(Actions.ACTION_USE, assist);
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: '2em',
      }}>
        <Timer timestamp={this.props.timestamp}/>
        <div>{
          this.props.assists.map((assist: string, index: number) => {
            return <Assit key={index} name={assist} assist={index} use={this.use.bind(this)} disabled={this.props.disabled}/>;
          })
        }</div>
      </div>
    );
  }
}
