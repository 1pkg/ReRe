import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: contents;
`

const DesktopContainer = Container.extend`
    font-size: 1.5rem;
`

const MobileContainer = Container.extend`
    font-size: 2.5rem;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        let Container = this.props.mobile ? MobileContainer : DesktopContainer
        return (
            <Container onClick={this.props.action}>
                {this.props.glyph}
            </Container>
        )
    }
}
