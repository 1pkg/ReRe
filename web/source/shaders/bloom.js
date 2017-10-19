// @flow

import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './../shaders'

type Props = {
    size: [number, number],
    children: GlReact.Node,
}

export default class Bloom extends React.Component<Props> {
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
        )
    }
}
