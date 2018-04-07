import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import GLReactImage from 'gl-react-image'
import { Surface } from 'gl-react-dom'
import styled from 'styled-components'

import Trigger from '~/actions/trigger'
import Bleached from '~/shaders/bleached'
import Bloom from '~/shaders/bloom'
import BlurHorizontal from '~/shaders/blur-horizontal'
import BlurVertical from '~/shaders/blur-vertical'
import Crosshatch from '~/shaders/crosshatch'
import Funnel from '~/shaders/funnel'
import Pixelation from '~/shaders/pixelation'
import Ripple from '~/shaders/ripple'
import Sepia from '~/shaders/sepia'
import WaveHorizontal from '~/shaders/wave-horizontal'
import WaveVertical from '~/shaders/wave-vertical'

const Effects = {
    bleached: Bleached,
    bloom: Bloom,
    'blur-horizontal': BlurHorizontal,
    'blur-vertical': BlurVertical,
    crosshatch: Crosshatch,
    funnel: Funnel,
    pixelation: Pixelation,
    ripple: Ripple,
    sepia: Sepia,
    'wave-horizontal': WaveHorizontal,
    'wave-vertical': WaveVertical,
}

let Container = styled.div`
    flex: 1;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
`

export default class extends React.Component {
    fit = () => {
        this.setState(state => {
            setTimeout(() => this.forceUpdate())

            let element = ReactDOM.findDOMNode(this)
            if (element instanceof Element) {
                return {
                    width: element.getBoundingClientRect().width,
                    height: element.getBoundingClientRect().height,
                }
            }
            return state
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

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    link() {
        return 'images/' + this.props.subject.link
    }

    apply() {
        let View = null
        Lodash.each(this.props.effects, effect => {
            if (!(effect.name in Effects)) {
                return
            }

            let Effect = Effects[effect.name]
            if (!View) {
                View = (
                    <Effect size={[this.state.width, this.state.height]}>
                        <GLReactImage source={this.link()} resizeMode="cover" />
                    </Effect>
                )
            } else {
                View = (
                    <Effect size={[this.state.width, this.state.height]}>
                        {View}
                    </Effect>
                )
            }
        })
        return View
    }

    render() {
        return (
            <Container>
                <Surface
                    width={this.state.width}
                    height={this.state.height}
                    onLoad={this.fit}
                >
                    {this.apply()}
                </Surface>
            </Container>
        )
    }
}
