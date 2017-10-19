// @flow

import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './../shaders'

type Props = {
    size: [number, number],
    children: GlReact.Node,
}

export default class BlurVertical extends React.Component<Props> {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.blur}
                uniforms={{
                    factor: 60.0,
                    sigma: 20.0,
                    orientation: 0,
                    size: this.props.size,
                    texture: this.props.children,
                }}
            />
        )
    }
}
