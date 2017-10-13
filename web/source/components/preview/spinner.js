// @flow

import React from 'react';
import Velocity from 'velocity-react/velocity-component';

import Spinner from 'react-icons/lib/io/load-a';

import * as Model from './../../model';
import Trigger from './../../actions/trigger';
import * as Actions from './../../actions/types';
import * as Constants from './../../constants';

export default class Start extends React.Component {
  props: {
    trigger: Trigger,
  }
  
  render() {
    return (
      <div style={{
        alignSelf: 'center', flexGrow: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontWeight: 'bold', fontSize: '4em',
      }}>
        <Velocity animation={{rotateZ: "360deg"}} duration={1000} loop={true} runOnMount={true}>
          <Spinner/>
        </Velocity>
      </div>
    );
  }
}
