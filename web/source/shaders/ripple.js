// @flow

import React from 'react';
import * as GlReact from 'gl-react';

import Shaders from './shaders';

export default class Ripple extends React.Component {
  props: {
    size: [number, number],
    children: GlReact.Node,
  }

  render() {
    return (
      <GlReact.Node
        shader={Shaders.ripple}
        uniforms={{
          size: this.props.size,
          texture: this.props.children,
        }}
      />
    );
  }
}
