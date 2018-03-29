import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

export default class Sepia extends React.Component {
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
