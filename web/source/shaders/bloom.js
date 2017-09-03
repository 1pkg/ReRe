// @flow

import React from 'react';
import * as GlReact from 'gl-react';

import Shaders from './shaders';

export default class Bloom extends React.Component {
  props: {
    size: [number, number],
    children: GlReact.Node,
  }

  render() {
    return (
      <GlReact.Node
        shader={Shaders.bloom}
        uniforms={{
          factor: 50.0,
          size: this.props.size,
          texture: this.props.children,
        }}
      />
    );
  }
}
