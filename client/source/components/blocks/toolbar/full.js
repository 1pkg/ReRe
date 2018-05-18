import React from 'react'

import { Fetch, Remake, Report, Timer } from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    actions() {
        if (!this.props.handled.report) {
            return [Timer, Report, Remake, Fetch]
        } else {
            return [Timer, Remake, Fetch]
        }
    }

    render() {
        return (
            <Toolbar
                actions={this.actions()}
                trigger={this.props.trigger}
                settings={this.props.settings}
                timestamp={this.props.timestamp}
                full={true}
            />
        )
    }
}
