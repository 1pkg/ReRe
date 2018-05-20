import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Cut as Toolbar } from './../blocks/toolbar'
import { Carousel, Copyright, Tape } from './../blocks/widgets'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const InnerContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    justify-content: space-between;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

export default class extends React.Component {
    daily() {
        if (this.props.state.lists.daily.length >= 3) {
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
        if (this.props.state.lists.weekly.length >= 3) {
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
        if (this.props.state.lists.monthly.length >= 3) {
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
            <Container>
                <Copyright settings={this.props.state.settings} />
                <InnerContainer mobile={Device.mobile()}>
                    <Carousel>
                        {this.daily()}
                        {this.weekly()}
                        {this.monthly()}
                    </Carousel>
                </InnerContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                    />
                </ToolbarContainer>
            </Container>
        )
    }

    desktop() {
        return (
            <Container>
                <Copyright settings={this.props.state.settings} />
                <InnerContainer>
                    {this.daily()}
                    {this.weekly()}
                    {this.monthly()}
                </InnerContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                    />
                </ToolbarContainer>
            </Container>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
