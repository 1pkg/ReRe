import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
    flex: 3 1 0;
    display: flex;
    align-items: center;
    justify-content:
        ${props => (props.full ? 'space-between' : 'space-around')};
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
        return <Container full={this.props.full}>{this.actions()}</Container>
    }
}
