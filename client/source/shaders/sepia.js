// @flow

import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

type Props = {
    size: [number, number],
    children: GlReact.Node,
}

export default class Sepia extends React.Component<Props> {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.sepia}
                uniforms={{
                    texture: this.props.children,
                }}
            />
        )
    }
}
