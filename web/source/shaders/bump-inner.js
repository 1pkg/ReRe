// @flow

import React from 'react';
import * as GlReact from 'gl-react';

import Shaders from './shaders';

export default class BumpInner extends React.Component {
  props: {
    size: [number, number],
    children: GlReact.Node,
  }

  render() {
    return (
      <GlReact.Node
        shader={Shaders.bump}
        uniforms={{
          orientation: 0,
          size: this.props.size,
          texture: this.props.children,
        }}
      />
    );
  }
}
