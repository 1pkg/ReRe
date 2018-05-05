import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'

const Container = Styled.div`
    user-select: none;
    display: contents;
    &:active {
        color: transparent;
    }
`

const DesktopContainer = Container.extend`
    font-size: ${props => (props.small ? '1rem' : '1.5rem')};
    &:hover {
        cursor: pointer;
    }
`

const MobileContainer = Container.extend`
    font-size: ${props => (props.small ? '1rem' : '2rem')};
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        const Container = Device.mobile() ? MobileContainer : DesktopContainer
        return (
            <Container onClick={this.props.action} small={this.props.small}>
                {this.props.glyph}
            </Container>
        )
    }
}
