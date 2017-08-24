// @flow

import React from 'react';

import Twitter from 'react-icons/lib/io/social-twitter-outline';
import Facebook from 'react-icons/lib/io/social-facebook-outline';
import ArrowRight from 'react-icons/lib/io/arrow-right-b';

import * as Effects from './../../effects';
import Trigger from './../../actions/trigger'
import * as Actions from './../../actions/types';

import Header from './../shared/header';

export default class Main extends React.Component {
  start(event: Event) {
    event.preventDefault();

    Trigger.call(Actions.ACTION_INITIALIZE);
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        height: '100vh',
      }}>
        <Header count={0}/>
        <div style={{
          fontWeight: 'bold', fontSize: '4em',
          flex: 1, alignSelf: 'center',
        }}
        >
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '100%',
          }}
            onMouseOver={Effects.hover}
            onMouseOut={Effects.unhover}
            onClick={this.start.bind(this)}
          >
            <span>START</span>
            &nbsp;
            <ArrowRight/>
          </span>
        </div>
        <div style={{
          fontWeight: 'bold', fontSize: '2em',
          alignSelf: 'flex-end',
        }}
        >
          <span onMouseOver={Effects.hover} onMouseOut={Effects.unhover}>
            <Twitter/>
          </span>
          <span onMouseOver={Effects.hover} onMouseOut={Effects.unhover}>
            <Facebook/>
          </span>
        </div>
      </div>
    );
  }
}
