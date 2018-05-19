import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import { Carousel } from './../blocks/widgets'

const Container = Styled.div`
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
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

export default class extends React.Component {
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
            <Container>
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
                    <Carousel option={this.props.state.option}>
                        {this.props.options}
                    </Carousel>
                </OptionContainer>
            </Container>
        )
    }

    desktop() {
        const Toolbar = this.props.toolbar
        return (
            <Container>
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
            </Container>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
