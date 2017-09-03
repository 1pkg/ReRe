// @flow

import React from 'react';
import * as GlReact from 'gl-react';

import Shaders from './shaders';

export default class Bleached extends React.Component {
  props: {
    size: [number, number],
    children: GlReact.Node,
  }

  render() {
    return (
      <GlReact.Node
        shader={Shaders.saturation}
        uniforms={{
          factor: 0.0,
          texture: this.props.children,
        }}
      />
    );
  }
}
