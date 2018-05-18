import React from 'react'

import {
    Disclaimer,
    Facebook,
    Fetch,
    Land,
    Reddit,
    Report,
    Star,
    Toggle,
    Twitter,
} from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={{
                    Toggle,
                    Reddit,
                    Twitter,
                    Facebook,
                    Star,
                    Disclaimer,
                    Land,
                    Report,
                    Fetch,
                }}
                trigger={this.props.trigger}
                settings={this.props.settings}
                handled={this.props.handled}
                timestamp={this.props.timestamp}
                full={this.props.full}
                toggle={this.props.toggle}
            />
        )
    }
}
