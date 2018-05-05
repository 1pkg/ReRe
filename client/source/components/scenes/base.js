import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import Styled from 'styled-components'

import { Device } from '~/helpers'

import Side from './../blocks/toolbar/side'
import Carousel from './../blocks/widgets/carousel'

const MainContainer = Styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const SubjectContainer = Styled.div`
    flex: 3 1 0;
    display: flex;
`

const MobileSubjectContainer = SubjectContainer.extend``

const DesktopSubjectContainer = SubjectContainer.extend`
    @media (max-width: 480px) {
        flex: 5 1 0;
    }
    @media (max-height: 270px) {
        flex: 1 1 0;
    }
`

const OptionContainer = Styled.div``

const FullOptionContainer = OptionContainer.extend`
    flex: 1 1 0;
    display: flex;
`

const NoneOptionContainer = OptionContainer.extend`
    display: none;
`

const ToolbarContainer = Styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
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
        this.state = { full: true }
    }

    toggle = () => {
        this.setState(state => {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
            return { full: !state.full }
        })
    }

    mobile() {
        const OptionContainer = this.state.full
            ? FullOptionContainer
            : NoneOptionContainer
        return (
            <MainContainer>
                <MobileSubjectContainer>
                    {this.props.subject}
                </MobileSubjectContainer>
                <ToolbarContainer>
                    <Side
                        disclaimer={this.props.settings['disclaimer-message']}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                    {this.props.toolbar}
                </ToolbarContainer>
                <OptionContainer>
                    <Carousel option={this.props.option}>
                        {this.props.options}
                    </Carousel>
                </OptionContainer>
            </MainContainer>
        )
    }

    desktop() {
        const OptionContainer = this.state.full
            ? FullOptionContainer
            : NoneOptionContainer
        return (
            <MainContainer>
                <DesktopSubjectContainer>
                    {this.props.subject}
                </DesktopSubjectContainer>
                <ToolbarContainer>
                    <Side
                        disclaimer={this.props.settings['disclaimer-message']}
                        full={this.state.full}
                        toggle={this.toggle}
                    />
                    {this.props.toolbar}
                </ToolbarContainer>
                <OptionContainer>{this.props.options}</OptionContainer>
            </MainContainer>
        )
    }

    render() {
        return Device.mobile() ? this.mobile() : this.desktop()
    }
}
