// @flow

import React from 'react'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'

import Header from './../shared/header'
import Start from './start'
import Share from './share'

type Props = {
    trigger: Trigger,
}

export default class Main extends React.Component<Props> {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Header trigger={this.props.trigger} score={NaN} />
                <Start trigger={this.props.trigger} />
                <Share trigger={this.props.trigger} />
            </div>
        )
    }
}
