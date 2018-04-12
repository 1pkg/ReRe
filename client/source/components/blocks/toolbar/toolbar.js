import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Fetch from './fetch'
import Redo from './redo'
import Timer from './timer'

const Container = styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    @media (max-width: 480px) {
        flex: 5 1 0;
    }
`

const FullContainer = Container.extend`
    justify-content: space-between;
`

const ShortContainer = Container.extend`
    justify-content: flex-end;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    actions() {
        return Lodash.map(this.props.actions, (Action, index) => {
            return (
                <Action
                    key={index}
                    trigger={this.props.trigger}
                    mobile={this.props.settings.mobile}
                    timestamp={this.props.timestamp}
                    settings={this.props.settings}
                />
            )
        })
    }

    render() {
        let Container = this.props.full ? FullContainer : ShortContainer
        return <Container>{this.actions()}</Container>
    }
}
