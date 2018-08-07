import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    &:active {
        color: ${props => props.theme['active-color']};
    };
    &:hover {
        cursor: pointer;
    };
`

const Hint = Styled.div`
    font-size: ${props => props.theme['half-small-unit']};
    font-style: italic;
    text-transform: lowercase;
    text-align: center;
`

export default class extends React.Component {
    render() {
        return (
            <Container onClick={this.props.action}>
                {this.props.glyph}
                <Hint>{this.props.hint}</Hint>
            </Container>
        )
    }
}
