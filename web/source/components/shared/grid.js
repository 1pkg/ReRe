// @flow

import React from 'react';
import deepEqual from 'deep-equal';

import * as Model from './../../model';
import * as Constants from './../../constants';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Option from './../process/option';
import OptionCorrect from './../result/option-correct';
import OptionFail from './../result/option-fail';

export default class Grid extends React.Component {
  props: {
    trigger: Trigger,
    options: Array<Model.Option>,
    image: ?Model.Image,
  }

  shouldComponentUpdate(props: {
    trigger: Trigger,
    options: Array<Model.Option>,
    image: ?Model.Image,
  }) {
    return !deepEqual(props, this.props);
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
          borderWidth: '0.1em 0em 0.1em 0em', borderStyle: 'solid', color: Constants.COLOR_SECOND,
        }}>{
          this.props.options.map((option : Model.Option) => {
            if (!this.props.image) {
              return <Option key={option.id} chose={this.chose.bind(this)} id={option.id}>{
                option.name
              }</Option>;
            } else {
              if (option.id == this.props.image.optionId) {
                return <OptionCorrect key={option.id}>{
                  option.name
                }</OptionCorrect>;
              } else {
                return <OptionFail key={option.id}>{
                  option.name
                }</OptionFail>;
              }
            }
          })
        }</div>
      </div>
    );
    }
}
