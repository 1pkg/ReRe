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
    correctoption: string,
  }

  shouldComponentUpdate(props: {
    trigger: Trigger,
    options: Array<Model.Option>,
    correctoption: string,
  }) {
    return !DeepEqual(props, this.props);
  }

  chose(event: SyntheticEvent) {
    let target: EventTarget = event.currentTarget;
    if (target instanceof HTMLElement) {
      let name: string = target.dataset.name;
      this.props.trigger.call(Actions.ACTION_CHOSE, name);
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
            if (this.props.correctoption === '') {
              return <Option key={index} name={option.name} chose={this.chose.bind(this)}>{
                option.name
              }</Option>;
            } else {
              if (option.name === this.props.correctoption) {
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
