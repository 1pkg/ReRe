import React from 'react'
import styled from 'styled-components'

import Collapse from './collapse'
import Expand from './expand'
import Fetch from './fetch'
import Redo from './redo'

let Container = styled.div`
    display: flex;
    justify-content: space-between;
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
                <Redo trigger={this.props.trigger} />
                <Fetch trigger={this.props.trigger} />
            </Container>
        )
    }
}
