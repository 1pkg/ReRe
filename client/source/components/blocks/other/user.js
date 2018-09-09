import React from 'react'
import { FaDoorOpen } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import dispatch from '~/dispatch'
import { Device } from '~/helpers'
import { Simple } from './../button'
import { tc } from '~/theme'

const Container = Styled.div`
    position: absolute;
    left: 100vw;
    top: 0vh;
    transform: translateX(-125%);
`

const Wrapper = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
`

const Text = Styled.div`
    text-align: center;
    font-size: ${props => props.theme[tc.smallu]};
    margin-right: ${props => props.theme[tc.smallu]}; 
`

export default class extends React.Component {
    logout = () => {
        this.props.trigger.push(Trigger.ACTION_LOGOUT, {
            status: Trigger.STATUS_LOGIN,
        })
        dispatch(this.props.trigger)
    }

    mobile() {
        return (
            <Container>
                <Wrapper>
                    <Simple
                        glyph={FaDoorOpen}
                        hint="logout"
                        action={this.logout}
                    />
                </Wrapper>
            </Container>
        )
    }

    desktop() {
        return (
            <Container>
                <Wrapper>
                    <Text>{this.props.alias}</Text>
                    <Simple
                        glyph={FaDoorOpen}
                        hint="logout"
                        action={this.logout}
                    />
                </Wrapper>
            </Container>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
