import React from 'react'
import Styled from 'styled-components'

const Text = Styled.div`
    font-size: ${props => props.theme['sub-normal-unit']};
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
`

export default class extends React.Component {
    render() {
        return <Text>{this.props.settings['copyright-text']}</Text>
    }
}
