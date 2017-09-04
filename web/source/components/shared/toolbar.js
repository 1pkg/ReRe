// @flow

import React from 'react';
import DeepEqual from 'deep-equal';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Hint from './hint';
import Timer from './timer';

export default class Toolbar extends React.Component {
  props: {
    trigger: Trigger,
    hints: Array<Model.Hint>,
    timestamp: number,
    disabled: boolean,
  }

  shouldComponentUpdate(props: {
    trigger: Trigger,
    hints: Array<Model.Hint>,
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
      let chosen: string = target.dataset.id;
      this.props.trigger.call(Actions.ACTION_HINT_USE, Number.parseInt(chosen));
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
          this.props.hints.map((hint : Model.Hint) => {
            return <Hint key={hint.id} id={hint.id} name={hint.name} use={this.use.bind(this)} disabled={this.props.disabled}/>;
          })
        }</div>
      </div>
    );
  }
}
