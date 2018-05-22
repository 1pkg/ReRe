import React from 'react'
import Swipeable from 'react-swipeable'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Carousel } from './../blocks/widgets'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SwipeableContainer = Styled(Swipeable)`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

const SubjectContainer = Styled.div`
    flex: 3 1 0;
    max-height: ${props => (props.full ? '100vh' : '70vh')};
    display: flex;
`

const OptionContainer = Styled.div`
    max-height: 25vh;
    display: ${props => (props.hidden ? 'none' : 'flex')};
    flex: 1 1 0;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme['half-small-unit']};
    margin-bottom: ${props => props.theme['half-small-unit']};
`

export default class extends React.Component {
    expand = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            return { full: true }
        })
    }

    colapse = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            return { full: false }
        })
    }

    toggle = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            return { full: !state.full }
        })
    }

    constructor(props) {
        super(props)
        this.state = { full: false }
    }

    mobile() {
        const Toolbar = this.props.toolbar
        return (
            <SwipeableContainer
                onSwipedDown={this.expand}
                onSwipedUp={this.colapse}
            >
                <SubjectContainer full={this.state.full}>
                    {this.props.subject}
                </SubjectContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                        handled={this.props.state.task.handled}
                        timestamp={this.props.state.timestamp}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                </ToolbarContainer>
                <OptionContainer hidden={this.state.full}>
                    <Carousel active={this.props.state.option}>
                        {this.props.options}
                    </Carousel>
                </OptionContainer>
            </SwipeableContainer>
        )
    }

    desktop() {
        const Toolbar = this.props.toolbar
        return (
            <MainContainer>
                <SubjectContainer full={this.state.full}>
                    {this.props.subject}
                </SubjectContainer>
                <ToolbarContainer>
                    <Toolbar
                        trigger={this.props.trigger}
                        settings={this.props.state.settings}
                        handled={this.props.state.task.handled}
                        timestamp={this.props.state.timestamp}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                </ToolbarContainer>
                <OptionContainer hidden={this.state.full}>
                    {this.props.options}
                </OptionContainer>
            </MainContainer>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
