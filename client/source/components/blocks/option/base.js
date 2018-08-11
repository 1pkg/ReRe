import React from 'react'
import Styled from 'styled-components'

import { Analytic, Device } from '~/helpers'

const hsu = 'half-small-unit'
const msu = 'min-small-unit'
const Container = Styled.div`
    flex: 1 1 0;
    overflow-y: auto;
    padding: ${props => props.theme[hsu]};
    margin-bottom: ${props => props.theme[hsu]};
    margin-right: ${props => props.theme[hsu]};
    margin-left: ${props => props.theme[hsu]};
    border:
        ${props => props.theme['minimal-unit']}
        solid
        ${props => props.theme['half-main-color']};
    box-shadow:
        ${props => props.theme[msu]}
        ${props => props.theme[msu]}
        ${props => props.theme[msu]}
        ${props => props.theme[msu]}
        ${props => props.theme['quarter-main-color']};
    opacity: ${props => (props.disabled ? 0.5 : 1.0)};
    @media screen and (orientation:landscape) {
        padding: ${props => (props.mobile ? '0rem' : props.theme[hsu])};
    }
`

const TitleContainer = Styled.div`
    text-align: center;
    margin-bottom: ${props => props.theme[hsu]};
    &:active {
        color:
            ${props => (props.disabled ? 'auto' : props.theme['active-color'])};
    };
    ${Container}:hover & {
        cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
    };
    @media screen and (orientation:landscape) {
        margin-bottom: ${props => (props.mobile ? '0rem' : props.theme[hsu])};
    }
`

const MainTitle = Styled.div`
    font-size: ${props => props.theme['sub-normal-unit']};
    font-weight: bold;
    text-transform: capitalize;
`

const SubTitle = Styled.div`
    font-size: ${props => props.theme['small-unit']};
    font-style: italic;
    text-transform: lowercase;
`

const Text = Styled.div`
    font-size: ${props => props.theme['sub-normal-unit']};
    text-align: justify;
    overflow: hidden;
    @media screen and (orientation:landscape) {
        display: ${props => (props.mobile ? 'none' : 'auto')};
    }
`

const Source = Styled.div`
    text-align: right;
    font-size: ${props => props.theme['small-unit']};
    margin-top: ${props => props.theme[hsu]};
    @media screen and (orientation:landscape) {
        text-align: ${props => (props.mobile ? 'center' : 'right')};
        margin-top: ${props => (props.mobile ? '0rem' : props.theme[hsu])};
    }
`

export default class extends React.Component {
    eventchoose = () => {
        Analytic.event(Analytic.EVENT_CLICK, {
            action: 'choose',
            name: this.props.option.name,
        })
        this.props.action()
    }

    eventlink = () => {
        Analytic.event(Analytic.EVENT_CLICK, {
            action: 'link',
            source: this.props.option.link,
        })
    }

    title() {
        let parts = this.props.option.name.match(/(.*) \((.*)\)/)
        return parts[1]
    }

    subtile() {
        let parts = this.props.option.name.match(/(.*) \((.*)\)/)
        return parts[2]
    }

    text() {
        return this.props.option.description
    }

    source() {
        return (
            <a
                href={this.props.option.link}
                target="_blank"
                onClick={this.eventlink}
            >
                {this.props.option.source}
            </a>
        )
    }

    render() {
        return (
            <Container
                mobile={!Device.tablet() && Device.mobile()}
                disabled={this.props.disabled}
            >
                <TitleContainer
                    mobile={!Device.tablet() && Device.mobile()}
                    disabled={this.props.disabled}
                    onClick={this.eventchoose}
                >
                    <MainTitle>{this.title()}</MainTitle>
                    <SubTitle>{this.subtile()}</SubTitle>
                </TitleContainer>
                <Text mobile={!Device.tablet() && Device.mobile()}>
                    {this.text()}
                </Text>
                <Source mobile={!Device.tablet() && Device.mobile()}>
                    {this.source()}
                </Source>
            </Container>
        )
    }
}
