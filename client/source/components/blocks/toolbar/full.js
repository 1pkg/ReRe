import React from 'react'

import Toolbar from './base'
import Fetch from './../widgets/fetch'
import Remake from './../widgets/remake'
import Timer from './../widgets/timer'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={[Timer, Remake, Fetch]}
                trigger={this.props.trigger}
                timestamp={this.props.timestamp}
                settings={this.props.settings}
                full={true}
            />
        )
    }
}
