import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Plain as Toolbar } from './../blocks/toolbar'
import { Tape } from './../blocks/widgets'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const Text = Styled.div`
    text-align: center;
    margin-top: 0.5rem;
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
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        return (
            <Container>
                <Text>popular</Text>
                <InnerContainer mobile={Device.mobile()}>
                    <Tape
                        title={'Daily'}
                        trigger={this.props.trigger}
                        shaders={this.props.state.shaders}
                        list={this.props.state.lists.daily}
                    />
                    <Tape
                        title={'Weekly'}
                        trigger={this.props.trigger}
                        shaders={this.props.state.shaders}
                        list={this.props.state.lists.weekly}
                    />
                    <Tape
                        title={'Monthly'}
                        trigger={this.props.trigger}
                        shaders={this.props.state.shaders}
                        list={this.props.state.lists.monthly}
                    />
                </InnerContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        disclaimer={
                            this.props.state.settings['disclaimer-message']
                        }
                    />
                </ToolbarContainer>
            </Container>
        )
    }
}
