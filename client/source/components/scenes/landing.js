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

export default class extends React.Component {
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
                />
            )
        }
        return null
    }

    mobile() {
        return (
            <MainContainer>
                <Copyright settings={this.props.state.settings} />
                <SubContainer mobile={Device.mobile()}>
                    <Carousel>
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
