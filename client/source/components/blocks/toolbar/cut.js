import React from 'react'

import { Env, Device } from '~/helpers'
import {
    Apprate,
    Disclaimer,
    Facebook,
    Fetch,
    Land,
    Market,
    Reddit,
    Table,
    Twitter,
} from './../widgets'
import Toolbar from './base'

export default class extends React.Component {
    cordova() {
        return {
            Disclaimer,
            Apprate,
            Reddit,
            Twitter,
            Facebook,
            Land,
            Table,
            Fetch,
        }
    }

    mobile() {
        return {
            Market,
            Disclaimer,
            Reddit,
            Twitter,
            Facebook,
            Land,
            Table,
            Fetch,
        }
    }

    desktop() {
        return {
            Disclaimer,
            Reddit,
            Twitter,
            Facebook,
            Land,
            Table,
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
                handled={{}}
            />
        )
    }
}
