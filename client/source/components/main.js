// @flow

import React from 'react'
import * as Redux from 'react-redux'
import * as Reflexbox from 'reflexbox'

import * as Model from '~/model'
import * as Constants from '~/constants'
import Trigger from '~/actions/trigger'
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
            return (
                <Reflexbox.Flex style={{ width: '100vw', height: '100vh' }}>
                    <None trigger={this.props.trigger} />
                </Reflexbox.Flex>
            )
        }

        return (
            <Reflexbox.Flex style={{ width: '100vw', height: '100vh' }}>
                {this.view(this.props.state.entry.status)}
            </Reflexbox.Flex>
        )
    }
}

export default Redux.connect((state: Model.State) => {
    return { state }
})(Main)
