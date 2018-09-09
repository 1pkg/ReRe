import React from 'react'
import Styled from 'styled-components'

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
    font-size: ${props => props.theme[tc.snu]};
    font-style: italic;
    text-transform: lowercase;
    text-align: center;
`

export default class extends React.Component {
    render() {
        const BeaconGlyph = Styled(this.props.glyph)`
            height: ${props => props.theme[tc.dbu]};
            width: ${props => props.theme[tc.dbu]};
        `
        return (
            <Container onClick={this.props.action}>
                <BeaconGlyph />
                <Hint>{this.props.hint}</Hint>
            </Container>
        )
    }
}
