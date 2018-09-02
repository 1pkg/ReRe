import React from 'react'
import { FaDoorOpen } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import dispatch from '~/dispatch'
import { Device } from '~/helpers'
import Button from './button'
import { tc } from '~/theme'

const Container = Styled.div`
    position: absolute;
    left: 0vw;
    top: 0vh;
`

const Wrapper = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
`

const Text = Styled.div`
    font-size: ${props => props.theme[tc.snu]};
    text-align: center;
    margin-left: ${props => props.theme[tc.smallu]}; 
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
                    <Button
                        glyph={<FaDoorOpen />}
                        action={this.logout}
                        hint="logout"
                    />
                </Wrapper>
            </Container>
        )
    }

    desktop() {
        return (
            <Container>
                <Wrapper>
                    <Button
                        glyph={<FaDoorOpen />}
                        action={this.logout}
                        hint="logout"
                    />
                    <Text>{this.props.alias}</Text>
                </Wrapper>
            </Container>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
