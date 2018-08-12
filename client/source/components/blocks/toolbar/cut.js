import React from 'react'

import {
    Disclaimer,
    Facebook,
    Fetch,
    Land,
    Reddit,
    Table,
    Twitter,
} from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    render() {
        return (
            <Toolbar
                actions={{
                    Disclaimer,
                    Reddit,
                    Twitter,
                    Facebook,
                    Land,
                    Table,
                    Fetch,
                }}
                trigger={this.props.trigger}
                settings={this.props.settings}
                handled={{}}
            />
        )
    }
}
