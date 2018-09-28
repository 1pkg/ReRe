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
    font-size: ${props => props.theme[tc.smallu]};
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
        const SBeaconGlyph = Styled(this.props.glyph)`
            height: ${props => props.theme[tc.smallu]};
            width: ${props => props.theme[tc.smallu]};
        `
        return (
            <Container onClick={this.evaction}>
                <SBeaconGlyph />
                <Hint>{this.props.hint}</Hint>
            </Container>
        )
    }
}
