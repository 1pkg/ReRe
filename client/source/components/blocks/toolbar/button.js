import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    user-select: none;
    display: contents;
    &:active {
        color: transparent;
    }
`

const DesktopContainer = Container.extend`
    font-size: 1.5rem;
    &:hover {
        cursor: pointer;
    }
`

const MobileContainer = Container.extend`
    font-size: 2rem;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        const Container = this.props.mobile ? MobileContainer : DesktopContainer
        return (
            <Container onClick={this.props.action}>
                {this.props.glyph}
            </Container>
        )
    }
}
