import { find } from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'
import GLReactImage from 'gl-react-image'
import { Surface } from 'gl-react-dom'
import Styled from 'styled-components'

import { Analytic } from '~/helpers'
import { Effect } from './../widgets'

const Container = Styled.div`
    flex: 1 1 0;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
`

const Image = Styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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

    link() {
        return `${SCHEMA}://${IMAGE_URL}/${this.props.subject.link}`
    }

    effect() {
        let Subject = (
            <GLReactImage
                source={this.link()}
                width={this.state.width}
                height={this.state.height}
                resizeMode="cover"
            />
        )
        for (let effect of this.props.effects) {
            let shader = find(
                this.props.shaders,
                shader => shader.name === effect.name,
            )
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

    source() {
        return (
            <Image
                src={this.link()}
                width={this.state.width}
                height={this.state.height}
                onLoad={this.fit}
            />
        )
    }

    render() {
        let effect = 'effects' in this.props && this.props.effects.length
        return <Container>{effect ? this.effect() : this.source()}</Container>
    }
}
