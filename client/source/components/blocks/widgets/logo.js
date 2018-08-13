import React from 'react'
import Styled from 'styled-components'

const Text = Styled.div`
    position: absolute;
    left: 50vw;
    top: 50vh;
    z-index: 999;
    transform: translateX(-50%) translateY(-50%);
    color: ${props => props.theme['active-color']};
    font-size: ${props => props.theme['big-unit']};
    font-style: italic;
    text-transform: lowercase;
`

export default class extends React.Component {
    render() {
        return <Text>rect.io</Text>
    }
}
