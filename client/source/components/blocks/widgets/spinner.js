import React from 'react'
import Styled, { keyframes as Keyframes } from 'styled-components'

import { tc } from '~/theme'

const Rotate = Keyframes`
    0% {
        transform: rotate(0deg);
    };
    100% {
        transform: rotate(360deg);
    };
`

const Blink = Keyframes`
    0% {
        opacity: 0.0;
    };
    100% {
        opacity: 1.0;
    };
`

const Container = Styled.div``

const Spinner = Styled.div`
    width: ${props => props.theme[tc.oahpbu]};
    height: ${props => props.theme[tc.oahpbu]};
    border-top:
        ${props => props.theme[tc.msu]}
        solid
        ${props => props.theme[tc.activec]};
    border-bottom:
        ${props => props.theme[tc.msu]}
        solid
        ${props => props.theme[tc.activec]};
    border-radius: 100%;
    animation: ${Rotate} 1s linear infinite;
`
const Text = Styled.div`
    position: absolute;
    left: 50vw;
    top: 50vh;
    z-index: 999;
    transform: translateX(-50%) translateY(-50%);
    color: ${props => props.theme[tc.activec]};
    font-style: italic;
    text-transform: lowercase;
    &:after {
        content: ' ... ';
        animation: ${Blink} 1s linear infinite;
    }
`

export default class extends React.Component {
    simple() {
        return <Spinner />
    }

    complex() {
        return (
            <Container>
                <Spinner />
                <Text>processing</Text>
            </Container>
        )
    }

    render() {
        return this.props.simple ? this.simple() : this.complex()
    }
}
