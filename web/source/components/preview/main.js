// @flow

import React from 'react'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'

import Header from './../shared/header'
import Grid from './../shared/grid'
import ToolBar from './../shared/toolbar'
import Spinner from './spinner'

type Props = {
    trigger: Trigger,
    state: Model.State,
}

export default class Main extends React.Component<Props> {
    render() {
        if (!this.props.state || !this.props.state.entry) {
            return null
        }

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
                <Header
                    trigger={this.props.trigger}
                    score={this.props.state.entry.score}
                />
                <Spinner trigger={this.props.trigger} />
                <ToolBar
                    trigger={this.props.trigger}
                    assists={this.props.state.entry.assists}
                    timestamp={NaN}
                    duration={NaN}
                    active={false}
                />
                <Grid trigger={this.props.trigger} options={[]} option={NaN} />
            </div>
        )
    }
}
