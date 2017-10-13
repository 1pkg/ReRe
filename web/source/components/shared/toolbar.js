// @flow

import React from 'react';
import Lodash from 'lodash';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

import Timer from './timer';
import Assit from './assit';

export default class Toolbar extends React.Component {
  props: {
    trigger: Trigger,
    assists: Array<string>,
    timestamp: number,
    active: boolean,
  }

  shouldComponentUpdate(props: {
    trigger: Trigger,
    assists: Array<string>,
    timestamp: number,
    active: boolean,
  }) {
    return !Lodash.isEqual(props, this.props)
      || this.props.timestamp != this.props.trigger.timestamp();
  }

  render() {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: '2em',
      }}>
        <Timer trigger={this.props.trigger} timestamp={this.props.timestamp}/>
        <div>{
          Lodash.map(this.props.assists, (assist: string, index: number) => {
            return (
              <Assit
                key={index}
                trigger={this.props.trigger}
                name={assist}
                assist={index}
                active={this.props.active}
              />
            )
          })
        }</div>
      </div>
    );
  }
}
