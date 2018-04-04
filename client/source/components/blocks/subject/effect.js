import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import GLReactImage from 'gl-react-image'
import * as GlReactDom from 'gl-react-dom'
import * as Reflexbox from 'reflexbox'

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

const EFFECT_NAME_BLEACHED = 'bleached'
const EFFECT_NAME_BLOOM = 'bloom'
const EFFECT_NAME_BLUR_HORIZONTAL = 'blur-horizontal'
const EFFECT_NAME_BLUR_VERTICAL = 'blur-vertical'
const EFFECT_NAME_CROSSHATCH = 'crosshatch'
const EFFECT_NAME_FUNNEL = 'funnel'
const EFFECT_NAME_PIXELATION = 'pixelation'
const EFFECT_NAME_RIPPLE = 'ripple'
const EFFECT_NAME_SEPIA = 'sepia'
const EFFECT_NAME_WAVE_HORIZONTAL = 'wave-horizontal'
const EFFECT_NAME_WAVE_VERTICAL = 'wave-vertical'

const Effects = {
    [EFFECT_NAME_BLEACHED]: Bleached,
    [EFFECT_NAME_BLOOM]: Bloom,
    [EFFECT_NAME_BLUR_HORIZONTAL]: BlurHorizontal,
    [EFFECT_NAME_BLUR_VERTICAL]: BlurVertical,
    [EFFECT_NAME_CROSSHATCH]: Crosshatch,
    [EFFECT_NAME_FUNNEL]: Funnel,
    [EFFECT_NAME_PIXELATION]: Pixelation,
    [EFFECT_NAME_RIPPLE]: Ripple,
    [EFFECT_NAME_SEPIA]: Sepia,
    [EFFECT_NAME_WAVE_HORIZONTAL]: WaveHorizontal,
    [EFFECT_NAME_WAVE_VERTICAL]: WaveVertical,
}

export default class Subject extends React.Component {
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

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    apply() {
        let View = null
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
