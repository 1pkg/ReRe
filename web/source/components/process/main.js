// @flow

import React from 'react'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'

import Header from './../shared/header'
import Grid from './../shared/grid'
import Subject from './../shared/subject'
import ToolBar from './../shared/toolbar'

type Props = {
    trigger: Trigger,
    state: Model.State,
}

export default class Main extends React.Component<Props> {
    render() {
        if (
            !this.props.state ||
            !this.props.state.entry ||
            !this.props.state.task
        ) {
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
                <Subject
                    trigger={this.props.trigger}
                    subject={this.props.state.task.subject}
                    effects={this.props.state.task.effects}
                />
                <ToolBar
                    trigger={this.props.trigger}
                    assists={this.props.state.entry.assists}
                    duration={
                        Constants.SETTING_TIMESTAMP_DURATION in
                        this.props.state.settings
                            ? Number(
                                  this.props.state.settings[
                                      Constants.SETTING_TIMESTAMP_DURATION
                                  ],
                              )
                            : NaN
                    }
                    timestamp={this.props.state.entry.timestamp}
                    active={true}
                />
                <Grid
                    trigger={this.props.trigger}
                    options={this.props.state.task.options}
                    option={NaN}
                />
            </div>
        )
    }
}
