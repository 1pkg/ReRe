// @flow

import React from 'react';

import Twitter from 'react-icons/lib/io/social-twitter-outline';
import Facebook from 'react-icons/lib/io/social-facebook-outline';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

export default class Share extends React.Component {
  props: {
    trigger: Trigger,
  }
  
  render() {
    return (
      <div style={{
        alignSelf: 'flex-end',
        fontWeight: 'bold', fontSize: '3em',
      }}>
        <span>
          <Twitter/>
        </span>
        <span>
          <Facebook/>
        </span>
      </div>
    );
  }
}
