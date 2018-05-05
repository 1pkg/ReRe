import React from 'react'
import Clock from 'react-icons/lib/fa/clock-o'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Timestamp } from '~/helpers'
import Button from './button'

const Container = Styled.div`
    display: flex;
    align-items: center;
`

const Period = Styled.div`
    font-size: 0.7rem;
    font-style: italic;
    text-transform: lowercase;
    margin-right: 0.1rem;
`

const TICK_INTERVAL = 1000

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.interval = null
        this.state = { timestamp: null, period: null }
    }

    componentDidMount() {
        this.setState(state => {
            return {
                timestamp: this.props.timestamp,
                period: this.props.settings['choose-period'],
            }
        })
        setTimeout(() => {
            this.interval = window.setInterval(this.tick, TICK_INTERVAL)
        })
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    componentWillReceiveProps(props) {
        this.setState(state => {
            return {
                timestamp: props.timestamp,
                period: props.settings['choose-period'],
            }
        })
        window.clearInterval(this.interval)
        setTimeout(() => {
            this.interval = window.setInterval(this.tick, TICK_INTERVAL)
        })
    }

    tick = () => {
        this.setState(state => {
            let timestamp = Timestamp.current()
            let period = state.period - (timestamp - state.timestamp)
            if (period <= 0) {
                this.props.trigger.call(Trigger.ACTION_CHOOSE, -1)
            }
            return { timestamp, period }
        })
    }

    glyph() {
        return (
            <Container>
                <Period>{this.state.period}</Period>
                <Clock />
            </Container>
        )
    }

    render() {
        return <Button glyph={this.glyph()} />
    }
}
