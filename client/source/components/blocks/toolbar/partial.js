import React from 'react'

import Toolbar from './base'
import { Fetch, Home, Rating, Toggle, Upvote } from './../button'
import { Disclaimer, Report } from './../modal'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={{
                    Toggle,
                    Upvote,
                    Disclaimer,
                    Rating,
                    Home,
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
