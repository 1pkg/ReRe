import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import GLReactImage from 'gl-react-image'
import { Surface } from 'gl-react-dom'
import styled from 'styled-components'

import Effect from './../effect'

const Container = styled.div`
    flex: 1;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    fit = () => {
        this.setState(state => {
            setTimeout(() => this.forceUpdate())
            let element = ReactDOM.findDOMNode(this)
            if (!element instanceof Element) {
                return state
            }
            return {
                width: element.getBoundingClientRect().width,
                height: element.getBoundingClientRect().height,
            }
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
        return 'images/' + this.props.subject.link
    }

    effect() {
        let Subject = null
        Lodash.each(this.props.effects, effect => {
            let shader = Lodash.find(
                this.props.shaders,
                shader => shader.name === effect.name,
            )
            if (shader === undefined) {
                return
            }

            if (Subject === null) {
                Subject = (
                    <Effect
                        shader={shader.shader}
                        size={[this.state.width, this.state.height]}
                        uniform={shader.uniform}
                    >
                        <GLReactImage source={this.link()} resizeMode="cover" />
                    </Effect>
                )
            } else {
                Subject = (
                    <Effect
                        shader={shader.shader}
                        size={[this.state.width, this.state.height]}
                        uniform={shader.uniform}
                    >
                        {Subject}
                    </Effect>
                )
            }
        })
        return (
            <Surface
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
