import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Carousel from './../blocks/carousel'
import Toggle from './../blocks/toolbar/toggle'

const MainContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const SubjectContainer = styled.div`
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

const FullOptionContainer = styled.div`
    flex: 1 1 0;
    display: flex;
`

const NoneOptionContainer = styled.div`
    display: none;
`

const ToolbarContainer = styled.div`
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
                    <Toggle
                        full={this.state.full}
                        toggle={this.toggle}
                        mobile
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
                    <Toggle full={this.state.full} toggle={this.toggle} />
                    {this.props.toolbar}
                </ToolbarContainer>
                <OptionContainer>{this.props.options}</OptionContainer>
            </MainContainer>
        )
    }

    render() {
        if (this.props.state.mobile) {
            return this.mobile()
        } else {
            return this.desktop()
        }
    }
}
