// @flow

import React from 'react';
import Lodash from 'lodash';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

export default class Header extends React.Component {
  props: {
    trigger: Trigger,
    score: number,
  }

  render() {
    let score: number = Lodash.isNaN(this.props.score) ? 0 : this.props.score;
    return (
      <div style={{
        alignSelf: 'flex-end',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        fontWeight: 'bold', fontSize: '1.5em',
      }}>
        <div>
          <span style={{color: Constants.COLOR_SECOND,}}>WIT</span>
          &nbsp;
          {score}
        </div>
      </div>
    );
  }
}
