import React from 'react'

import Toolbar from './toolbar'
import Fetch from './fetch'

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
