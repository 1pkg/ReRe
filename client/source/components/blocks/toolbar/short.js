import React from 'react'

import { Fetch, Report } from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={[Report, Fetch]}
                trigger={this.props.trigger}
                settings={this.props.settings}
                timestamp={this.props.timestamp}
                full={false}
            />
        )
    }
}
