// @flow

import React from 'react';

import * as Constants from './../../constants';

export default class Header extends React.Component {
  props: {
    score: number,
  }

  render() {
    return (
      <div style={{
        alignSelf: 'flex-end',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        fontWeight: 'bold', fontSize: '1.5em',
      }}>
        <div>
          <span style={{
            color: Constants.COLOR_SECOND,
          }}>WIT</span>
          &nbsp;
          {this.props.score}
        </div>
      </div>
    );
  }
}
