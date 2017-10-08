// @flow

import React from 'react';
import DeepEqual from 'deep-equal';

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
    option: number,
  }

  shouldComponentUpdate(props: {
    trigger: Trigger,
    options: Array<Model.Option>,
    option: number,
  }) {
    return !DeepEqual(props, this.props);
  }

  chose(event: SyntheticEvent) {
    let target: EventTarget = event.currentTarget;
    if (target instanceof HTMLElement) {
      let option: number = Number.parseInt(target.dataset.option);
      this.props.trigger.call(Actions.ACTION_CHOSE, option);
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
          this.props.options.map((option: Model.Option, index: number) => {
            if (Number.isNaN(this.props.option)) {
              return <Option key={index} option={index} chose={this.chose.bind(this)}>{
                option.name
              }</Option>;
            } else {
              if (index === this.props.option) {
                return <OptionCorrect key={index}>{
                  option.name
                }</OptionCorrect>;
              } else {
                return <OptionFail key={index}>{
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
