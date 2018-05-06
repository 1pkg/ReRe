import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'

import Side from './../blocks/toolbar/side'
import Carousel from './../blocks/widgets/carousel'

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
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    constructor(props) {
        super(props)
        this.state = { full: false }
    }

    toggle = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            return { full: !state.full }
        })
    }

    mobile() {
        return (
            <Container>
                <SubjectContainer full={this.state.full}>
                    {this.props.subject}
                </SubjectContainer>
                <ToolbarContainer>
                    <Side
                        disclaimer={this.props.settings['disclaimer-message']}
                        options={this.props.state.task.options}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                    {this.props.toolbar}
                </ToolbarContainer>
                <OptionContainer hidden={this.state.full}>
                    <Carousel option={this.props.option}>
                        {this.props.options}
                    </Carousel>
                </OptionContainer>
            </Container>
        )
    }

    desktop() {
        return (
            <Container>
                <SubjectContainer full={this.state.full}>
                    {this.props.subject}
                </SubjectContainer>
                <ToolbarContainer>
                    <Side
                        disclaimer={this.props.settings['disclaimer-message']}
                        options={this.props.state.task.options}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                    {this.props.toolbar}
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
