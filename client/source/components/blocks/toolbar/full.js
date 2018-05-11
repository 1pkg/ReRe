import React from 'react'

import { Fetch, Remake, Report, Timer } from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={[Timer, Report, Remake, Fetch]}
                trigger={this.props.trigger}
                timestamp={this.props.timestamp}
                settings={this.props.settings}
                full={true}
            />
        )
    }
}
