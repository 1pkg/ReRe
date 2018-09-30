import React from 'react'

import { Env, Device } from '~/helpers'
import Toolbar from './base'
import { Facebook, Fetch, Home, Rating, Reddit } from './../button'
import { Dashboard, Disclaimer, Download, Feedback } from './../modal'

export default class extends React.Component {
    cordova() {
        return {
            Disclaimer,
            Dashboard,
            Feedback,
            Reddit,
            Facebook,
            Home,
            Rating,
            Fetch,
        }
    }

    mobile() {
        return {
            Download,
            Disclaimer,
            Dashboard,
            Reddit,
            Facebook,
            Home,
            Rating,
            Fetch,
        }
    }

    desktop() {
        return {
            Disclaimer,
            Dashboard,
            Reddit,
            Facebook,
            Home,
            Rating,
            Fetch,
        }
    }

    render() {
        let actions = Env.cordova()
            ? this.cordova()
            : Device.mobile()
                ? this.mobile()
                : this.desktop()

        return (
            <Toolbar
                actions={actions}
                trigger={this.props.trigger}
                settings={this.props.settings}
                notifications={this.props.notifications}
                handled={{}}
            />
        )
    }
}
