import React from 'react'

import Subject from './subject'

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

export default class extends React.Component {
    render() {
        return (
            <Subject
                subject={this.props.subject}
                effects={this.props.effects}
                effectsDB={{
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
                }}
            />
        )
    }
}
