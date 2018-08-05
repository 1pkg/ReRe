import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Cut as Toolbar } from './../blocks/toolbar'
import { Carousel, Copyright, Tape } from './../blocks/widgets'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SubContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    justify-content: space-between;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme['half-small-unit']};
    margin-bottom: ${props => props.theme['half-small-unit']};
`

export default class self extends React.Component {
    static PERIOD_MAP = ['daily', 'weekly', 'monthly']

    constructor(props) {
        super(props)
        this.state = {
            daily: true,
            weekly: false,
            monthly: false,
        }
    }

    activate = period => {
        this.setState(prev => {
            let next = {
                daily: false,
                weekly: false,
                monthly: false,
            }
            next[self.PERIOD_MAP[period]] = true
            return next
        })
    }

    daily(active) {
        if (
            this.props.state.lists.daily.length >= MINIMAL_LANDING_TAPE_LENGTH
        ) {
            return (
                <Tape
                    title={'Daily Popular'}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    list={this.props.state.lists.daily}
                    active={active}
                />
            )
        }
        return null
    }

    weekly(active) {
        if (
            this.props.state.lists.weekly.length >= MINIMAL_LANDING_TAPE_LENGTH
        ) {
            return (
                <Tape
                    title={'Weekly Popular'}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    list={this.props.state.lists.weekly}
                    active={active}
                />
            )
        }
        return null
    }

    monthly(active) {
        if (
            this.props.state.lists.monthly.length >= MINIMAL_LANDING_TAPE_LENGTH
        ) {
            return (
                <Tape
                    title={'Monthly Popular'}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    list={this.props.state.lists.monthly}
                    active={active}
                />
            )
        }
        return null
    }

    mobile() {
        return (
            <MainContainer>
                <Copyright settings={this.props.state.settings} />
                <SubContainer>
                    <Carousel activate={this.activate}>
                        {this.daily(this.state.daily)}
                        {this.weekly(this.state.weekly)}
                        {this.monthly(this.state.monthly)}
                    </Carousel>
                </SubContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }

    desktop() {
        return (
            <MainContainer>
                <Copyright settings={this.props.state.settings} />
                <SubContainer>
                    {this.daily(true)}
                    {this.weekly(true)}
                    {this.monthly(true)}
                </SubContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                    />
                </ToolbarContainer>
            </MainContainer>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
