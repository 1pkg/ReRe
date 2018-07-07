import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'

const Container = Styled.div`
    flex: 1 1 0;
    overflow-y: auto;
    padding: ${props => props.theme['half-small-unit']};
    margin-bottom: ${props => props.theme['half-small-unit']};
    margin-right: ${props => props.theme['half-small-unit']};
    margin-left: ${props => props.theme['half-small-unit']};
    border:
        ${props => props.theme['minimal-unit']}
        solid
        ${props => props.theme['half-main-color']};
    box-shadow:
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['min-small-unit']}
        ${props => props.theme['quarter-main-color']};
    opacity: ${props => (props.disabled ? 0.5 : 1.0)};
`

const DisabledTitleContainer = Styled.div`
    text-align: center;
    margin-bottom: ${props => props.theme['half-small-unit']};
`

const ActiveTitleContainer = Styled(DisabledTitleContainer)`
    &:active {
        color: ${props => props.theme['active-color']};
    };
    ${Container}:hover & {
        cursor: pointer;
    };
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
`

const Source = Styled.div`
    font-size: ${props => props.theme['small-unit']};
    text-align: right;
    margin-top: ${props => props.theme['half-small-unit']};
`

export default class extends React.Component {
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
            <a href={this.props.option.link} target="_blank">
                {this.props.option.source}
            </a>
        )
    }

    render() {
        const TitleContainer = this.props.disabled
            ? DisabledTitleContainer
            : ActiveTitleContainer
        return (
            <Container mobile={Device.mobile()} disabled={this.props.disabled}>
                <TitleContainer onClick={this.props.action}>
                    <MainTitle>{this.title()}</MainTitle>
                    <SubTitle>{this.subtile()}</SubTitle>
                </TitleContainer>
                <Text mobile={Device.mobile()}>{this.text()}</Text>
                <Source>{this.source()}</Source>
            </Container>
        )
    }
}
