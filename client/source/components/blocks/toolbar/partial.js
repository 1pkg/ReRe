import React from 'react'

import { Disclaimer, Fetch, Land, Report, Star, Toggle } from './../widgets'
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
                    Report,
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
