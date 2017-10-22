// @flow

import React from 'react'
import Tooltip from 'react-tooltip'
import Lodash from 'lodash'

import Help from 'react-icons/lib/io/help-circled'
import Checkmark from 'react-icons/lib/io/checkmark-circled'
import Close from 'react-icons/lib/io/close-circled'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'
import * as Colors from './../../colors'

type Props = {
    trigger: Trigger,
    children: string,
    option: number,
    hint: string,
    result: ?boolean,
}

export default class Option extends React.Component<Props> {
    chose = () => {
        this.props.trigger.call(Trigger.ACTION_CHOSE, this.props.option)
    }

    render() {
        if (Lodash.isNil(this.props.result)) {
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.2em 0em 0.2em 0em',
                    }}
                >
                    <span onClick={this.chose}>{this.props.children}</span>
                    &nbsp;
                    <Help
                        data-tip={this.props.hint}
                        style={{ color: Colors.COLOR_VAGUE }}
                    />
                    <Tooltip effect="solid" place="right" />
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
                    }}
                >
                    <span>{this.props.children}</span>
                    &nbsp;
                    <Checkmark style={{ color: Colors.COLOR_POSTIVE }} />
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
                    }}
                >
                    <span>{this.props.children}</span>
                    &nbsp;
                    <Close style={{ color: Colors.COLOR_NEGATIVE }} />
                </div>
            )
        }
    }
}
