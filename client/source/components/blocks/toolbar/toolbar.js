import Lodash from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Fetch from './fetch'
import Redo from './redo'
import Timer from './timer'

let Container = styled.div`
    flex: 1 1 0;
    display: flex;
`

let FullContainer = Container.extend`
    justify-content: space-between;
`

let ShortContainer = Container.extend`
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
