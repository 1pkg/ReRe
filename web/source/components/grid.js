// @flow
import React from 'react';

import * as Model from './../model'
import Trigger from './../actions/trigger'
import * as Actions from './../actions/types';

import Option from './option';

export default class Grid extends React.Component {
  props: {
    options: [Model.Option, Model.Option, Model.Option],
    dispatch: (Model.Action) => void,
  }

  chose(event: Event) {
    let target: EventTarget = event.target;
    if (target instanceof HTMLElement) {
      let chosen: string = target.dataset.id;
      Trigger.call(this.props.dispatch, Actions.ACTION_OPTION_CHOSE, Number.parseInt(chosen));
    }
  }

  render() {
    return (
      <div style={{
        width: '50%', height: '8vh', marginLeft: '25%', marginTop: '2vh',
        display: 'flex', flexDirection: 'row',  flexWrap: 'nowrap', justifyContent: 'space-between',
        borderWidth: '2px 0px 2px 0px', borderStyle: 'solid', borderColor: '#890606',
      }}>{
        this.props.options.map((option : Model.Option) => {
          return <Option key={option.id} chose={this.chose.bind(this)} id={option.id}>{
            option.name
          }</Option>;
        })
      }</div>
    );
    }
}
