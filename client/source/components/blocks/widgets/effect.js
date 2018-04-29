import React from 'react'
import { Node } from 'gl-react'

export default class extends React.Component {
    render() {
        return (
            <Node
                shader={this.props.shader}
                width={this.props.width}
                height={this.props.height}
                uniforms={{
                    size: [this.props.width, this.props.height],
                    texture: this.props.children,
                    ...this.props.uniform,
                }}
            />
        )
    }
}
