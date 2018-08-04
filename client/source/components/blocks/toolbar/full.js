import React from 'react'

import {
    Disclaimer,
    Fetch,
    Land,
    Remake,
    Report,
    Star,
    Timer,
    Toggle,
} from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={{
                    Toggle,
                    Star,
                    Disclaimer,
                    Land,
                    Timer,
                    Report,
                    Remake,
                    Fetch,
                }}
                trigger={this.props.trigger}
                settings={this.props.settings}
                label={this.props.label}
                handled={this.props.handled}
                timestamp={this.props.timestamp}
                full={this.props.full}
                toggle={this.props.toggle}
            />
        )
    }
}
