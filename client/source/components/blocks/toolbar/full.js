import React from 'react'

import Toolbar from './toolbar'
import Fetch from './fetch'
import Redo from './redo'
import Timer from './timer'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={[Timer, Redo, Fetch]}
                trigger={this.props.trigger}
                timestamp={this.props.timestamp}
                settings={this.props.settings}
                full={true}
            />
        )
    }
}
