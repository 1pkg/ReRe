import React from 'react'
import Styled from 'styled-components'

import { Analytic } from '~/helpers'

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
    evaction = () => {
        Analytic.event(Analytic.EVENT_CLICK, { action: this.props.hint })
        this.props.action()
    }

    render() {
        return (
            <Container onClick={this.evaction}>
                {this.props.glyph}
                <Hint>{this.props.hint}</Hint>
            </Container>
        )
    }
}
