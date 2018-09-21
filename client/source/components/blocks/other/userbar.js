import React from 'react'
import { FaDoorOpen } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import dispatch from '~/dispatch'
import { Device, Timestamp } from '~/helpers'
import { Badge, Micra } from './../button'
import { tc } from '~/theme'

const Container = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Wrapper = Styled.div`
    flex: ${props => (props.mobile ? '0 0 25%' : '0 0 5%')};
    display: flex;
    justify-content: space-between;
    font-size: ${props => props.theme[tc.smallu]};
`

const CenterWrapper = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
`

const Alias = Styled.div`
    text-align: center;
    font-size: ${props => props.theme[tc.hsu]};
    margin-right: ${props => props.theme[tc.hsu]}; 
`

const Text = Styled.div`
    font-size: ${props => props.theme[tc.smallu]};
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
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
                <Wrapper mobile={Device.mobile()}>
                    <Badge text={`${this.props.stats.factor}x`} hint="factor" />
                    <Badge text={this.props.stats.freebie} hint="freebie" />
                    <Badge text={this.props.stats.score} hint="score" />
                </Wrapper>
                <Text>
                    {APPLICATION_NAME} @ {Timestamp.year()} all rights reserved
                </Text>
                <CenterWrapper>
                    <Micra
                        glyph={FaDoorOpen}
                        hint="logout"
                        action={this.logout}
                    />
                </CenterWrapper>
            </Container>
        )
    }

    desktop() {
        return (
            <Container>
                <Wrapper mobile={Device.mobile()}>
                    <Badge text={`${this.props.stats.factor}x`} hint="factor" />
                    <Badge text={this.props.stats.freebie} hint="freebie" />
                    <Badge text={this.props.stats.score} hint="score" />
                </Wrapper>
                <Text>
                    {APPLICATION_NAME} @ {Timestamp.year()} all rights reserved
                </Text>
                <CenterWrapper>
                    <Alias>{this.props.alias}</Alias>
                    <Micra
                        glyph={FaDoorOpen}
                        hint="logout"
                        action={this.logout}
                    />
                </CenterWrapper>
            </Container>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
