import Lodash from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Side from './../blocks/toolbar/side'
import Footer from './../blocks/widgets/footer'
import Carousel from './../blocks/widgets/carousel'

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

const OptionContainer = styled.div``

const FullOptionContainer = OptionContainer.extend`
    flex: 1 1 0;
    display: flex;
`

const NoneOptionContainer = OptionContainer.extend`
    display: none;
`

const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
`

const FooterContainer = styled.div``

const FullFooterContainer = FooterContainer.extend`
    display: block;
`

const NoneFooterContainer = FooterContainer.extend`
    display: none;
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
        const FooterContainer = this.state.full
            ? FullFooterContainer
            : NoneFooterContainer
        return (
            <MainContainer>
                <MobileSubjectContainer>
                    {this.props.subject}
                </MobileSubjectContainer>
                <ToolbarContainer>
                    <Side full={this.state.full} toggle={this.toggle} mobile />
                    {this.props.toolbar}
                </ToolbarContainer>
                <OptionContainer>
                    <Carousel option={this.props.option}>
                        {this.props.options}
                    </Carousel>
                </OptionContainer>
                <FooterContainer>
                    <Footer settings={this.props.state.settings} mobile />
                </FooterContainer>
            </MainContainer>
        )
    }

    desktop() {
        const OptionContainer = this.state.full
            ? FullOptionContainer
            : NoneOptionContainer
        const FooterContainer = this.state.full
            ? FullFooterContainer
            : NoneFooterContainer
        return (
            <MainContainer>
                <DesktopSubjectContainer>
                    {this.props.subject}
                </DesktopSubjectContainer>
                <ToolbarContainer>
                    <Side full={this.state.full} toggle={this.toggle} />
                    {this.props.toolbar}
                </ToolbarContainer>
                <OptionContainer>{this.props.options}</OptionContainer>
                <FooterContainer>
                    <Footer settings={this.props.state.settings} />
                </FooterContainer>
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
