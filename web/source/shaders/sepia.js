// @flow

import React from 'react';
import * as GlReact from 'gl-react';

import Shaders from './shaders';

export default class Sepia extends React.Component {
  props: {
    size: [number, number],
    children: GlReact.Node,
  }

  render() {
    return (
      <GlReact.Node
        shader={Shaders.sepia}
        uniforms={{texture: this.props.children,}}
      />
    );
  }
}
