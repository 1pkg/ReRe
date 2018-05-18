import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Cut as Toolbar } from './../blocks/toolbar'
import { Copyright, Tape } from './../blocks/widgets'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const InnerContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: ${props => (props.mobile ? 'column' : 'row')};
    justify-content: space-between;
    overflow-y: hidden;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

export default class extends React.Component {
    render() {
        return (
            <Container>
                <Copyright settings={this.props.state.settings} />
                <InnerContainer mobile={Device.mobile()}>
                    <Tape
                        title={'Daily Popular'}
                        trigger={this.props.trigger}
                        shaders={this.props.state.shaders}
                        list={this.props.state.lists.daily}
                    />
                    <Tape
                        title={'Weekly Popular'}
                        trigger={this.props.trigger}
                        shaders={this.props.state.shaders}
                        list={this.props.state.lists.weekly}
                    />
                    <Tape
                        title={'Monthly Popular'}
                        trigger={this.props.trigger}
                        shaders={this.props.state.shaders}
                        list={this.props.state.lists.monthly}
                    />
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
}
