import React from 'react'

import Toolbar from './base'
import Fetch from './../widgets/fetch'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={[Fetch]}
                trigger={this.props.trigger}
                timestamp={this.props.timestamp}
                settings={this.props.settings}
                full={false}
            />
        )
    }
}
