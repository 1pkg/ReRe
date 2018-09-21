import { filter, map } from 'lodash'
import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default class extends React.Component {
    actions() {
        let actions = filter(this.props.actions, (action, name) => {
            return !this.props.handled[name.toLocaleLowerCase()]
        })
        return map(actions, (Action, index) => {
            return (
                <Action
                    key={index}
                    trigger={this.props.trigger}
                    settings={this.props.settings}
                    stats={this.props.stats}
                    notifications={this.props.notifications}
                    label={this.props.label}
                    timestamp={this.props.timestamp}
                    full={this.props.full}
                    toggle={this.props.toggle}
                />
            )
        })
    }

    render() {
        return <Container>{this.actions()}</Container>
    }
}
