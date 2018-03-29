import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

export default class Bloom extends React.Component {
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
