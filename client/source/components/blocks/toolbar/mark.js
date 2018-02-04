// @flow

import Lodash from 'lodash'
import React from 'react'

import Toggle from './toggle'

type Props = {
    content: any,
    pictogram: any,
    hint: string,
}

type State = { active: boolean }

export default class extends React.Component<Props, State> {
    toggle = () => {
        this.setState((state: State) => {
            return { active: !state.active }
        })
    }

    constructor(props: Props) {
        super(props)
        this.state = { active: false }
    }

    shouldComponentUpdate(props: Props, state: State) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        return (
            <Toggle
                pictogram={this.props.pictogram}
                hint={this.props.hint}
                onClick={this.toggle}
            />
        )
    }
}
