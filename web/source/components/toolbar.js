// @flow

import React from 'react';

import * as Model from './../model'
import Trigger from './../actions/trigger'
import * as Actions from './../actions/types';

import Hint from './hint'
import Timer from './timer';

export default class Toolbar extends React.Component {
  props: {
    hints: Array<Model.Hint>,
    time: number,
    dispatch: (Model.Action) => void,
  }

  use(event: Event) {
    let target: EventTarget = event.target;
    if (target instanceof HTMLElement) {
      let chosen: string = target.dataset.id;
      Trigger.call(this.props.dispatch, Actions.ACTION_OPTION_CHOSE, Number.parseInt(chosen));
    }
  }

  render() {
    return (
      <div style={{
          display: 'flex', flexDirection: 'row',  flexWrap: 'nowrap', justifyContent: 'space-between',
      }}>
        <div style={{
          height: '8vh', marginLeft: '0%',
        }}>
          <Timer time={this.props.time}/>
        </div>
        <div style={{
          height: '8vh', marginTop: '1vh', textAlign: 'center',
        }}>{
          this.props.hints.map((hint : Model.Hint) => {
            return <Hint key={hint.id} use={this.use.bind(this)} id={hint.id} name={hint.name}/>;
          })
        }</div>
      </div>
    );
  }
}
