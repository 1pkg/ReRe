// @flow

import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

type Props = {
    size: [number, number],
    children: GlReact.Node,
}

export default class Bleached extends React.Component<Props> {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.saturation}
                uniforms={{
                    factor: 0.0,
                    texture: this.props.children,
                }}
            />
        )
    }
}
