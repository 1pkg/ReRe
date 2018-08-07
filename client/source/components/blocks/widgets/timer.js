import React from 'react'
import Clock from 'react-icons/lib/fa/clock-o'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Timestamp } from '~/helpers'
import Button from './button'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ac = 'active-color'
const mc = 'main-color'
const Wrapper = Styled.div`
    color: ${props => (props.critical ? props.theme[ac] : props.theme[mc])};
`

const Text = Styled.div`
    font-size: ${props => props.theme['half-small-unit']};
    font-style: italic;
    text-transform: lowercase;
`

export default class extends React.Component {
    tick = async () => {
        this.setState(state => {
            let timestamp = Timestamp.current()
            let current = state.period - (timestamp - state.timestamp)
            if (current <= 0) {
                this.props.trigger.call(Trigger.ACTION_CHOOSE, -1)
            }
            return { ...state, current }
        })
    }

    constructor(props) {
        super(props)
        this.interval = null
        this.state = {
            timestamp: null,
            period: null,
            current: null,
        }
    }

    componentDidMount() {
        this.setState(state => {
            return {
                timestamp: this.props.timestamp,
                period: this.props.settings['choose-period'],
                current: '∞',
            }
        })
        this.interval = window.setInterval(this.tick, TIMER_TICK_INTERVAL)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    glyph() {
        return (
            <Container>
                <Wrapper
                    critical={
                        this.state.current <=
                        this.props.settings['choose-period'] / 3
                    }
                >
                    <Clock />
                </Wrapper>
                <Text>{this.state.current}</Text>
            </Container>
        )
    }

    render() {
        return <Button glyph={this.glyph()} />
    }
}
