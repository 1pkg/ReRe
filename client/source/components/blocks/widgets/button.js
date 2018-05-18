import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'

const Container = Styled.div`
    user-select: none;
    display: contents;
    &:active {
        color: transparent;
    }
    &:hover {
        cursor: pointer;
    }
    font-size: 1.5rem;
`

export default class extends React.Component {
    render() {
        return (
            <Container onClick={this.props.action}>
                {this.props.glyph}
            </Container>
        )
    }
}
