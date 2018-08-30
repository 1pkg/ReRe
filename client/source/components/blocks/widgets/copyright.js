import React from 'react'
import Styled from 'styled-components'

import { Timestamp } from '~/helpers'
import { tc } from '~/theme'

const Text = Styled.div`
    font-size: ${props => props.theme[tc.snu]};
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
`

export default class extends React.Component {
    render() {
        return (
            <Text>
                {APPLICATION_NAME} @ {Timestamp.year()} all rights reserved
            </Text>
        )
    }
}
