import React from 'react'
import Styled from 'styled-components'

const Text = Styled.div`
    font-size: 0.7rem;
    font-style: italic;
    text-align: right;
    text-transform: lowercase;
`

export default class extends React.Component {
    render() {
        return <Text>{this.props.settings['copyright-text']}</Text>
    }
}
