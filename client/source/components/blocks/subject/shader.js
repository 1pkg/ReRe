import React from 'react'
import { GLSL, Node, Shaders } from 'gl-react'

export default class self extends React.Component {
    static shaders = {}

    get(name, code) {
        if (!(name in self.shaders)) {
            self.shaders[name] = Shaders.create({
                self: { frag: GLSL`${code.frag}` },
            })
        }
        return self.shaders[name].self
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
