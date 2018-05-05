import React from 'react'

import Toolbar from './base'
import Fetch from './../widgets/fetch'
import Report from './../widgets/report'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={[Report, Fetch]}
                trigger={this.props.trigger}
                timestamp={this.props.timestamp}
                settings={this.props.settings}
                full={false}
            />
        )
    }
}
