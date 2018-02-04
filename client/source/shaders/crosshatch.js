// @flow

import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

type Props = {
    size: [number, number],
    children: GlReact.Node,
}

export default class Crosshatch extends React.Component<Props> {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.crosshatch}
                uniforms={{
                    texture: this.props.children,
                }}
            />
        )
    }
}
