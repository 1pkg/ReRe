import React from 'react'
import Styled from 'styled-components'

import { tc } from '~/theme'

const Text = Styled.div`
    position: absolute;
    left: 50vw;
    top: 50vh;
    z-index: 999;
    transform: translateX(-50%) translateY(-50%);
    color: ${props => props.theme[tc.activec]};
    font-size: ${props => props.theme[tc.sbu]};
    padding: ${props => props.theme[tc.hsu]};
    font-style: italic;
    text-transform: lowercase;
    text-align: center;
    background-color: ${props => props.theme[tc.subc]};
    border-radius: ${props => props.theme[tc.hsu]};
    border-top:
        ${props => props.theme[tc.msu]}
        solid
        ${props => props.theme[tc.activec]};
    border-bottom:
        ${props => props.theme[tc.msu]}
        solid
        ${props => props.theme[tc.activec]};
`

export default class extends React.Component {
    render() {
        return <Text>{APPLICATION_NAME}</Text>
    }
}
