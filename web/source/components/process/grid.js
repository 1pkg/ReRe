// @flow
import React from 'react';

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Actions from './../../actions/types';

import Option from './option';

export default class Grid extends React.Component {
  props: {
    options: Array<Model.Option>,
  }

  chose(event: Event) {
    let target: EventTarget = event.currentTarget;
    if (target instanceof HTMLElement) {
      let chosen: string = target.dataset.id;
      Trigger.call(Actions.ACTION_OPTION_CHOSE, Number.parseInt(chosen));
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          width: '50%',
          display: 'flex', justifyContent: 'space-between',
          fontWeight: 'bold',
          borderWidth: '2px 0px 2px 0px', borderStyle: 'solid',
        }}>{
          this.props.options.map((option : Model.Option) => {
            return <Option key={option.id} chose={this.chose.bind(this)} id={option.id}>{
              option.name
            }</Option>;
          })
        }</div>
      </div>
    );
    }
}
