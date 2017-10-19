// @flow

import React from 'react'
import Lodash from 'lodash'

import Checkmark from 'react-icons/lib/io/checkmark-round'
import Close from 'react-icons/lib/io/close-round'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'
import * as Colors from './../../colors'

type Props = {
    trigger: Trigger,
    children: string,
    option: number,
    result: ?boolean,
}

export default class Option extends React.Component<Props> {
    render() {
        if (Lodash.isNil(this.props.result)) {
            let action: any = this.props.trigger.call.bind(
                this.props.trigger,
                Trigger.ACTION_CHOSE,
                this.props.option,
            )
            return (
                <div
                    style={{
                        padding: '0.2em 0em 0.2em 0em',
                        color: Colors.COLOR_MAIN,
                    }}
                    onClick={action}
                >
                    {this.props.children}
                </div>
            )
        } else if (this.props.result) {
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.2em 0em 0.2em 0em',
                        color: Colors.COLOR_CORRECT,
                    }}
                >
                    <span>{this.props.children}</span>
                    &nbsp;
                    <Checkmark />
                </div>
            )
        } else {
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.2em 0em 0.2em 0em',
                        color: Colors.COLOR_FAIL,
                    }}
                >
                    <span>{this.props.children}</span>
                    &nbsp;
                    <Close />
                </div>
            )
        }
    }
}
