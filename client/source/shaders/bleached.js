import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

export default class Bleached extends React.Component {
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
