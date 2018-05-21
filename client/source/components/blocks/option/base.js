import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'

const Container = Styled.div`
    flex: 1 1 0;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 0.01rem solid ${props => props.theme['half-main-color']};
    box-shadow:
        0.1rem 0.1rem 0.1rem 0.1rem
        ${props => props.theme['fourth-main-color']};
    overflow-x: hidden;
    overflow-y: auto;
    opacity: ${props => (props.disabled ? 0.5 : 1.0)};
`

const TitleContainer = Styled.div`
    margin-bottom: 0.5rem;
    text-align: center;
    &:active {
        color: ${props => props.theme['active-color']};
    }
    ${Container}:hover & {
        cursor: pointer;
    }
`

const MainTitle = Styled.div`
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: capitalize;
`

const SubTitle = Styled.div`
    font-size: 0.7rem;
    font-style: italic;
    text-transform: lowercase;
`

const Text = Styled.div`
    font-size: 0.8rem;
    overflow: hidden;
    text-align: justify;
`

const Source = Styled.div`
    margin-top: 0.5rem;
    font-size: 0.7rem;
    text-align: right;
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
        let words = this.props.option.description.split(' ')
        if (words.length <= 100) {
            return this.props.option.description
        }
        words = words.slice(0, 100)
        return `${words.join(' ')}  ...`
    }

    source() {
        return (
            <a href={this.props.option.link} target="_blank">
                {this.props.option.source}
            </a>
        )
    }

    render() {
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
