import React from 'react'
import Styled from 'styled-components'

import { Analytic, Device } from '~/helpers'
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
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.setState(prev => {
            let lists = this.props.state.lists
            let d = lists.daily.length >= MINIMAL_LANDING_TAPE_LENGTH
            let w = lists.weekly.length >= MINIMAL_LANDING_TAPE_LENGTH
            let m = lists.monthly.length >= MINIMAL_LANDING_TAPE_LENGTH
            let next = {}
            if (d) {
                next['daily'] = true
            }
            if (w) {
                next['weekly'] = !d
            }
            if (m) {
                next['monthly'] = !d && !m
            }
            return next
        })
    }

    activate = index => {
        this.setState(prev => {
            let indx = 0
            let next = Object.assign({}, prev)
            for (let period in next) {
                next[period] = index == indx++
            }
            Analytic.event(Analytic.EVENT_SWIPE, { index })
            return next
        })
    }

    daily() {
        if (
            this.props.state.lists.daily.length >= MINIMAL_LANDING_TAPE_LENGTH
        ) {
            return (
                <Tape
                    title={'Daily Popular'}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    list={this.props.state.lists.daily}
                    active={!Device.mobile() || this.state.daily}
                />
            )
        }
        return null
    }

    weekly() {
        if (
            this.props.state.lists.weekly.length >= MINIMAL_LANDING_TAPE_LENGTH
        ) {
            return (
                <Tape
                    title={'Weekly Popular'}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    list={this.props.state.lists.weekly}
                    active={!Device.mobile() || this.state.weekly}
                />
            )
        }
        return null
    }

    monthly() {
        if (
            this.props.state.lists.monthly.length >= MINIMAL_LANDING_TAPE_LENGTH
        ) {
            return (
                <Tape
                    title={'Monthly Popular'}
                    trigger={this.props.trigger}
                    shaders={this.props.state.shaders}
                    list={this.props.state.lists.monthly}
                    active={!Device.mobile() || this.state.monthly}
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
                        {this.daily()}
                        {this.weekly()}
                        {this.monthly()}
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
                    {this.daily()}
                    {this.weekly()}
                    {this.monthly()}
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
