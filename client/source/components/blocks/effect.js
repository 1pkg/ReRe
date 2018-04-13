import React from 'react'
import { Node } from 'gl-react'

export default class extends React.Component {
    render() {
        return (
            <Node
                shader={this.props.shader}
                uniforms={{
                    size: this.props.size,
                    texture: this.props.children,
                    ...this.props.uniform,
                }}
            />
        )
    }
}
