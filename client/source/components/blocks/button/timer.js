import React from 'react'
import { FaClock } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Analytic, Timestamp } from '~/helpers'
import Button from './complex'
import { tc } from '~/theme'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Wrapper = Styled.div`
    color: ${props => (props.critical ? props.theme[tc.activec] : 'inherit')};
`

const Text = Styled.div`
    font-size: ${props => props.theme[tc.hsu]};
    font-style: italic;
    text-transform: lowercase;
`

export default class extends React.Component {
    tick = async () => {
        this.setState(state => {
            let timestamp = Timestamp.current()
            let current = state.period - (timestamp - state.timestamp)
            if (current <= 0) {
                Analytic.event(Analytic.EVENT_TIMEOUT)
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
                ...state,
                timestamp: this.props.timestamp,
                period:
                    this.props.settings['choose-period'] /
                    this.props.stats.factor,
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
                    <FaClock />
                </Wrapper>
                <Text>{this.state.current}</Text>
            </Container>
        )
    }

    render() {
        return <Button glyph={this.glyph()} />
    }
}
