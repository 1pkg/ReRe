import React from 'react'
import styled from 'styled-components'

import Collapse from './collapse'
import Expand from './expand'

let Container = styled.div`
    flex: 2 1 0;
`

export default class extends React.Component {
    toggler() {
        return this.props.full ? Collapse : Expand
    }

    render() {
        let Toggler = this.toggler()
        return (
            <Container>
                <Toggler toggle={this.props.toggle} />
            </Container>
        )
    }
}
