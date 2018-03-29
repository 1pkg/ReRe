import Lodash from 'lodash'
import React from 'react'

import Toggle from './toggle'

export default class extends React.Component {
    toggle = () => {
        this.setState(state => {
            return { active: !state.active }
        })
    }

    constructor(props) {
        super(props)
        this.state = { active: false }
    }

    shouldComponentUpdate(props, state) {
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
