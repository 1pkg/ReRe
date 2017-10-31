// @flow

import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

type Props = {
    size: [number, number],
    children: GlReact.Node,
}

export default class WaveHorizontal extends React.Component<Props> {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.wave}
                uniforms={{
                    orientation: 1,
                    size: this.props.size,
                    texture: this.props.children,
                }}
            />
        )
    }
}
