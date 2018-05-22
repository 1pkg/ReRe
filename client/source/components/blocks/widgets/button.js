import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'

const Container = Styled.div`
    display: contents;
    user-select: none;
    &:active {
        color: ${props => props.theme['active-color']};
    };
    &:hover {
        cursor: pointer;
    };
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
