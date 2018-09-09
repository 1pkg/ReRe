import React from 'react'

import Toolbar from './base'
import { Fetch, Home, Rating, Remake, Timer, Toggle, Upvote } from './../button'
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
                    Timer,
                    Report,
                    Remake,
                    Fetch,
                }}
                trigger={this.props.trigger}
                settings={this.props.settings}
                stats={this.props.stats}
                label={this.props.label}
                handled={this.props.handled}
                timestamp={this.props.timestamp}
                full={this.props.full}
                toggle={this.props.toggle}
            />
        )
    }
}
