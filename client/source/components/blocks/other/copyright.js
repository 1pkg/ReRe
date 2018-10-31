import React from 'react'
import Styled from 'styled-components'

import { Timestamp } from '~/helpers'
import { tc } from '~/theme'

const Container = Styled.div`
    position: absolute;
    left: 50vw;
    top: 0vh;
    z-index: 999;
    transform: translateX(-50%);
`

const Text = Styled.div`
    font-size: ${props => props.theme[tc.smallu]};
    font-style: italic;
    text-align: center;
`

export default class extends React.Component {
    render() {
        return (
            <Container>
                <Text>
                    {APPLICATION_SHORT_NAME} @ {Timestamp.year()} all rights
                    reserved
                </Text>
            </Container>
        )
    }
}
