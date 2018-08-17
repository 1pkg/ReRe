import React from 'react'

import { Env } from '~/helpers'
import {
    Apprate,
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
        let actions = Env.cordova()
            ? {
                  Disclaimer,
                  Apprate,
                  Reddit,
                  Twitter,
                  Facebook,
                  Land,
                  Table,
                  Fetch,
              }
            : {
                  Disclaimer,
                  Reddit,
                  Twitter,
                  Facebook,
                  Land,
                  Table,
                  Fetch,
              }
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
