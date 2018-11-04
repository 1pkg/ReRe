import { find } from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'
import GLReactImage from 'gl-react-image'
import { Surface } from 'gl-react-dom'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic } from '~/helpers'
import Effect from './shader'

const Container = Styled.div`
    flex: 1 1 0;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
`

export default class self extends React.Component {
    static id = 0
    static intervals = {}

    load = async () => {
        let source = null
        let element = findDOMNode(this)
        let rect = element.getBoundingClientRect()
        let visible =
            rect.top >= -rect.height &&
            rect.left >= -rect.width &&
            rect.bottom <= window.innerHeight + rect.height &&
            rect.right <= window.innerWidth + rect.width
        if (visible) {
            let blobs = await this.props.trigger.call(
                Trigger.ACTION_TRANSLATE,
                [this.props.subject.link],
                true,
            )
            source = blobs[this.props.subject.link]
        } else {
            source = null
        }

        if (this.state.source != source) {
            this.setState(state => {
                return { ...state, source }
            })
        }
    }

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
        this.state = {
            width: 0,
            height: 0,
            id: ++self.id,
            source: props.blobs[props.subject.link],
        }
    }

    async componentDidMount() {
        window.addEventListener('resize', this.fit)
        self.intervals[this.state.id] = setInterval(
            this.load,
            TIMER_TICK_INTERVAL,
        )
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.fit)
        window.clearInterval(self.intervals[this.state.id])
    }

    source() {
        let Subject = (
            <GLReactImage
                source={this.state.source}
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
        if (this.state.source) {
            return <Container>{this.source()}</Container>
        }
        return <Container />
    }
}
