import React from 'react'
import Styled from 'styled-components'

import { Analytic, Device } from '~/helpers'
import { tc } from '~/theme'

const Container = Styled.div`
    flex: 1 1 0;
    overflow-y: auto;
    padding: ${props => props.theme[tc.hsu]};
    margin-bottom: ${props => props.theme[tc.hsu]};
    margin-right: ${props => props.theme[tc.hsu]};
    margin-left: ${props => props.theme[tc.hsu]};
    border:
        ${props => props.theme[tc.minu]}
        solid
        ${props => props.theme[tc.hmc]};
    box-shadow:
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.msu]}
        ${props => props.theme[tc.qmc]};
    opacity: ${props => (props.disabled ? 0.5 : 1.0)};
    @media screen and (orientation:landscape) {
        padding:
            ${props => (props.mob ? props.theme[tc.zu] : props.theme[tc.hsu])};
    }
`

const TitleContainer = Styled.div`
    text-align: center;
    margin-bottom: ${props => props.theme[tc.hsu]};
    &:active {
        color:
            ${props => (props.disabled ? 'auto' : props.theme[tc.activec])};
    };
    ${Container}:hover & {
        cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
    };
    @media screen and (orientation:landscape) {
        margin-bottom:
            ${props => (props.mob ? props.theme[tc.zu] : props.theme[tc.hsu])};
    }
`

const MainTitle = Styled.div`
    font-size: ${props => props.theme[tc.snu]};
    font-weight: bold;
    text-transform: capitalize;
`

const SubTitle = Styled.div`
    font-size: ${props => props.theme[tc.smallu]};
    font-style: italic;
    text-transform: lowercase;
`

const Text = Styled.div`
    font-size: ${props => props.theme[tc.snu]};
    text-align: justify;
    overflow: hidden;
    @media screen and (orientation:landscape) {
        display: ${props => (props.mob ? 'none' : 'auto')};
    }
`

const Source = Styled.div`
    text-align: right;
    font-size: ${props => props.theme[tc.smallu]};
    margin-top: ${props => props.theme[tc.hsu]};
    @media screen and (orientation:landscape) {
        text-align: ${props => (props.mob ? 'center' : 'right')};
        margin-top:
            ${props => (props.mob ? props.theme[tc.zu] : props.theme[tc.hsu])};
    }
`

const Link = Styled.a``

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
            <Link
                href={this.props.option.link}
                target="_blank"
                onClick={this.eventlink}
            >
                {this.props.option.source}
            </Link>
        )
    }

    render() {
        return (
            <Container
                mob={!Device.tablet() && Device.mobile()}
                disabled={this.props.disabled}
            >
                <TitleContainer
                    mob={!Device.tablet() && Device.mobile()}
                    disabled={this.props.disabled}
                    onClick={this.eventchoose}
                >
                    <MainTitle>{this.title()}</MainTitle>
                    <SubTitle>{this.subtile()}</SubTitle>
                </TitleContainer>
                <Text mob={!Device.tablet() && Device.mobile()}>
                    {this.text()}
                </Text>
                <Source mob={!Device.tablet() && Device.mobile()}>
                    {this.source()}
                </Source>
            </Container>
        )
    }
}
