// @flow

import React from 'react';

import Twitter from 'react-icons/lib/io/social-twitter-outline';
import Facebook from 'react-icons/lib/io/social-facebook-outline';
import ArrowRight from 'react-icons/lib/io/arrow-right-b';

import * as Effects from './../../effects';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';

import Header from './../shared/header';

export default class Main extends React.Component {
  props: {
    trigger: Trigger,
  }

  start(event: SyntheticEvent) {
    event.preventDefault();

    this.props.trigger.call(Actions.ACTION_INITIALIZE);
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',
        height: '100vh',
      }}>
        <Header count={0}/>
        <div style={{
          alignSelf: 'center', flexGrow: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', fontSize: '4em',
        }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseOver={Effects.hover}
            onMouseOut={Effects.unhover}
            onClick={this.start.bind(this)}
          >
            <span>START</span>
            &nbsp;
            <ArrowRight/>
          </div>
        </div>
        <div style={{
          alignSelf: 'flex-end',
          fontWeight: 'bold', fontSize: '2em',
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
