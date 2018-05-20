import React from 'react'
import { GLSL, Node, Shaders } from 'gl-react'

let shaders = {}
export default class extends React.Component {
    get(name, code) {
        if (!(name in shaders)) {
            shaders[name] = Shaders.create({
                self: { frag: GLSL`${code.frag}` },
            })
        }
        return shaders[name].self
    }

    render() {
        return (
            <Node
                shader={this.get(
                    this.props.shader.name,
                    this.props.shader.code,
                )}
                width={this.props.width}
                height={this.props.height}
                uniforms={{
                    size: [this.props.width, this.props.height],
                    texture: this.props.children,
                    ...this.props.shader.uniform,
                }}
            />
        )
    }
}
