// @flow

import React from 'react';
import * as GlReact from 'gl-react';

import Shaders from './shaders';

export default class BlurHorizontal extends React.Component {
  props: {
    size: [number, number],
    children: GlReact.Node,
  }

  render() {
    return (
      <GlReact.Node
        shader={Shaders.blur}
        uniforms={{
          factor: 60.0,
          sigma: 20.0,
          orientation: 1,
          size: this.props.size,
          texture: this.props.children,
        }}
      />
    );
  }
}
