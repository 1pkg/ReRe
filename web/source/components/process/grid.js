// @flow
import React from 'react';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Option from './option';

export default class Grid extends React.Component {
  props: {
    trigger: Trigger,
    options: Array<Model.Option>,
  }

  chose(event: SyntheticEvent) {
    let target: EventTarget = event.currentTarget;
    if (target instanceof HTMLElement) {
      let chosen: string = target.dataset.id;
      this.props.trigger.call(Actions.ACTION_OPTION_CHOSE, Number.parseInt(chosen));
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          flexGrow: 0.5,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: '1.5em',
          borderWidth: '0.1em 0em 0.1em 0em', borderStyle: 'solid',
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
