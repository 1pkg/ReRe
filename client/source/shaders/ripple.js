import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

export default class Ripple extends React.Component {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.ripple}
                uniforms={{
                    size: this.props.size,
                    texture: this.props.children,
                }}
            />
        )
    }
}
