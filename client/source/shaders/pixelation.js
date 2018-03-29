import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

export default class Pixelation extends React.Component {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.pixelation}
                uniforms={{
                    factor: 10.0,
                    size: this.props.size,
                    texture: this.props.children,
                }}
            />
        )
    }
}
