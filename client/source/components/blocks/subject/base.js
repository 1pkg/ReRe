import { find } from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'
import GLReactImage from 'gl-react-image'
import { Surface } from 'gl-react-dom'
import Styled from 'styled-components'

import { Analytic } from '~/helpers'
import Effect from './shader'

const Container = Styled.div`
    flex: 1 1 0;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
`

export default class extends React.Component {
    fit = () => {
        this.setState(state => {
            setTimeout(() => this.forceUpdate())
            let element = findDOMNode(this)
            let rect = element.getBoundingClientRect()
            let width = Math.floor(rect.width)
            let height = Math.floor(rect.height)
            Analytic.event(Analytic.EVENT_FIT, { width, height })
            return { ...state, width, height }
        })
    }

    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0 }
    }

    componentDidMount() {
        window.addEventListener('resize', this.fit)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.fit)
    }

    source() {
        let Subject = (
            <GLReactImage
                source={this.props.blobs[this.props.subject.link]}
                width={this.state.width}
                height={this.state.height}
                resizeMode="cover"
            />
        )
        if (this.props.effects && this.props.effects.length) {
            Subject = this.apply(
                Subject,
                this.props.effects,
                this.props.shaders,
            )
        }
        return (
            <Surface
                pixelRatio={1}
                width={this.state.width}
                height={this.state.height}
                onLoad={this.fit}
            >
                {Subject}
            </Surface>
        )
    }

    apply(subject, effects, shaders) {
        let Subject = subject
        for (let effect of effects) {
            let shader = find(shaders, shader => shader.name === effect.name)
            if (Subject && shader) {
                Subject = (
                    <Effect
                        width={this.state.width}
                        height={this.state.height}
                        shader={shader}
                    >
                        {Subject}
                    </Effect>
                )
            }
        }
        return Subject
    }

    render() {
        return <Container>{this.source()}</Container>
    }
}
