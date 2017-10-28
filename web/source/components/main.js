// @flow

import React from 'react'
import * as Redux from 'react-redux'

import * as Model from './../model'
import Trigger from './../actions/trigger'
import * as Constants from './../constants'

import None from './scenes/none'
import Preview from './scenes/preview'
import Process from './scenes/process'
import Result from './scenes/result'

type Props = {
    trigger: Trigger,
    state: Model.State,
}

class Main extends React.Component<Props> {
    view(status: string) {
        switch (status) {
            case Constants.STATUS_PREVIEW:
                return (
                    <Preview
                        trigger={this.props.trigger}
                        state={this.props.state}
                    />
                )

            case Constants.STATUS_PROCESS:
                return (
                    <Process
                        trigger={this.props.trigger}
                        state={this.props.state}
                    />
                )

            case Constants.STATUS_RESULT:
                return (
                    <Result
                        trigger={this.props.trigger}
                        state={this.props.state}
                    />
                )
        }
    }

    render() {
        if (!this.props.state || !this.props.state.entry) {
            return <None trigger={this.props.trigger} />
        }

        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                }}
            >
                {this.view(this.props.state.entry.status)}
            </div>
        )
    }
}

export default Redux.connect((state: Model.State) => {
    return { state }
})(Main)
