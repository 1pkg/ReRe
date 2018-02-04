// @flow

import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import GLReactImage from 'gl-react-image'
import * as GlReactDom from 'gl-react-dom'
import * as Reflexbox from 'reflexbox'

import * as Model from '~/model'
import * as Constants from '~/constants'
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
    [Constants.EFFECT_NAME_BLEACHED]: Bleached,
    [Constants.EFFECT_NAME_BLOOM]: Bloom,
    [Constants.EFFECT_NAME_BLUR_HORIZONTAL]: BlurHorizontal,
    [Constants.EFFECT_NAME_BLUR_VERTICAL]: BlurVertical,
    [Constants.EFFECT_NAME_CROSSHATCH]: Crosshatch,
    [Constants.EFFECT_NAME_FUNNEL]: Funnel,
    [Constants.EFFECT_NAME_PIXELATION]: Pixelation,
    [Constants.EFFECT_NAME_RIPPLE]: Ripple,
    [Constants.EFFECT_NAME_SEPIA]: Sepia,
    [Constants.EFFECT_NAME_WAVE_HORIZONTAL]: WaveHorizontal,
    [Constants.EFFECT_NAME_WAVE_VERTICAL]: WaveVertical,
}

type Props = {
    trigger: Trigger,
    subject: string,
    effects: Array<string>,
}

type State = {
    width: number,
    height: number,
}

export default class Subject extends React.Component<Props, State> {
    fit = () => {
        this.setState((state: State) => {
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

    constructor(props: Props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.fit)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.fit)
    }

    shouldComponentUpdate(props: Props, state: State) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    apply() {
        let View: ?React.Component<any> = null
        Lodash.each(this.props.effects, effect => {
            if (!(effect in Effects)) {
                return
            }

            let Effect = Effects[effect]
            if (!View) {
                View = (
                    <Effect size={[this.state.width, this.state.height]}>
                        <GLReactImage
                            source={this.props.subject}
                            resizeMode="cover"
                        />
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
            <Reflexbox.Flex
                auto
                style={{
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    overflow: 'hidden',
                }}
            >
                <GlReactDom.Surface
                    width={this.state.width}
                    height={this.state.height}
                    onLoad={this.fit}
                >
                    {this.apply()}
                </GlReactDom.Surface>
            </Reflexbox.Flex>
        )
    }
}
