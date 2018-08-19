import React from 'react'
import Styled from 'styled-components'

import { Analytic } from '~/helpers'
import { tc } from '~/theme'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    &:active {
        color: ${props => props.theme[tc.activec]};
    };
    &:hover {
        cursor: pointer;
    };
`

const Hint = Styled.div`
    font-size:
        ${props => (props.hbig ? props.theme[tc.snu] : props.theme[tc.hsu])};
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
                <Hint hbig={this.props.hbig}>{this.props.hint}</Hint>
            </Container>
        )
    }
}
