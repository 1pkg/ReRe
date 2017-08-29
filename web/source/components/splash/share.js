// @flow

import React from 'react';

import Twitter from 'react-icons/lib/io/social-twitter-outline';
import Facebook from 'react-icons/lib/io/social-facebook-outline';

import * as Effects from './../../effects';

export default class Share extends React.Component {
  render() {
    return (
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
    );
  }
}
