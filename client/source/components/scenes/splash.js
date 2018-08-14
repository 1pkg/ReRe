import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Device } from '~/helpers'
import { Effect as Subject } from './../blocks/subject'
import { Logo } from './../blocks/widgets'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SubContainer = Styled.div`
    flex: 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = Styled.div`
    flex: ${props => (props.mobile ? '0 0 50%' : '0 0 25%')};
    transform: translateY(-25%);
    font-weight: bold;
    text-align: center;
    background-color: ${props => props.theme['sub-color']};
    border-radius: ${props => props.theme['half-small-unit']};
    border-top:
        ${props => props.theme['min-small-unit']}
        solid
        ${props => props.theme['active-color']};
`

export default class extends React.Component {
    land = async () => {
        this.props.trigger.call(Trigger.ACTION_LAND)
    }

    componentDidMount() {
        this.interval = window.setInterval(this.land, SPLASH_SCREEN_INTERVAL)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        if (this.props.state.splash) {
            return (
                <Container>
                    <Subject
                        subject={this.props.state.splash.subject}
                        effects={this.props.state.splash.effects}
                        shaders={this.props.state.shaders}
                    />
                    <SubContainer>
                        <Wrapper mobile={Device.mobile()}>
                            rect of the week
                        </Wrapper>
                    </SubContainer>
                </Container>
            )
        }
        return <Logo />
    }
}
