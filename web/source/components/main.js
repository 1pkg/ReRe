// @flow

import React from 'react'
import * as Redux from 'react-redux'

import * as Model from './../model'
import Trigger from './../actions/trigger'
import * as Constants from './../constants'
import * as Colors from './../colors'

import None from './none/main'
import Preview from './preview/main'
import Process from './process/main'
import Result from './result/main'

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
                    color: Colors.COLOR_MAIN,
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
