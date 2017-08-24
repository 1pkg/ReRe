// @flow

import React from 'react';

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Actions from './../../actions/types';

import Hint from './hint'
import Timer from './timer';

export default class Toolbar extends React.Component {
  props: {
    hints: Array<Model.Hint>,
    time: number,
  }

  use(event: Event) {
    let target: EventTarget = event.currentTarget;
    if (target instanceof HTMLElement) {
      let chosen: string = target.dataset.id;
      Trigger.call(Actions.ACTION_HINT_USE, Number.parseInt(chosen));
    }
  }

  render() {
    return (
      <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: '2em',
      }}>
        <Timer time={this.props.time}/>
        <div>{
          this.props.hints.map((hint : Model.Hint) => {
            return <Hint key={hint.id} use={this.use.bind(this)} id={hint.id} name={hint.name}/>;
          })
        }</div>
      </div>
    );
  }
}
