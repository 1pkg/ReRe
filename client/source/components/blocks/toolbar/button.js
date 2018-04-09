import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

let Container = styled.div`
    font-size: 2rem;
    color: black;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        return (
            <Container onClick={this.props.action}>
                {this.props.glyph}
            </Container>
        )
    }
}
