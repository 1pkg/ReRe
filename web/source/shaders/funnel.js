// @flow

import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

type Props = {
    size: [number, number],
    children: GlReact.Node,
}

export default class Funnel extends React.Component<Props> {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.funnel}
                uniforms={{
                    size: this.props.size,
                    texture: this.props.children,
                }}
            />
        )
    }
}
