import React from 'react'

import { Fetch, Report } from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    actions() {
        if (!this.props.handled.report) {
            return [Report, Fetch]
        } else {
            return [Fetch]
        }
    }

    render() {
        return (
            <Toolbar
                actions={this.actions()}
                trigger={this.props.trigger}
                settings={this.props.settings}
                timestamp={this.props.timestamp}
                full={false}
            />
        )
    }
}
