import React from 'react'
import Styled from 'styled-components'

import { Copyright } from './../blocks/widgets'
import { tc } from '~/theme'

const MainContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const SubContainer = Styled.div``

const MainText = Styled.div`
    font-size: ${props => props.theme[tc.sbu]};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`

const MinorText = Styled.div`
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
`

export default class extends React.Component {
    render() {
        return (
            <MainContainer>
                <Copyright />
                <SubContainer>
                    <MainText>We can't</MainText>
                    <MainText>support</MainText>
                    <MainText>your browser</MainText>
                </SubContainer>
                <SubContainer>
                    <MinorText>for using service you should</MinorText>
                    <MinorText>update your browser</MinorText>
                    <MinorText>or</MinorText>
                    <MinorText>use different browser</MinorText>
                </SubContainer>
            </MainContainer>
        )
    }
}
