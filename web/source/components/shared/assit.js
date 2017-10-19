// @flow

import React from 'react'

import Redo from 'react-icons/lib/io/loop'
import Infinite from 'react-icons/lib/io/ios-infinite'
import Reduce from 'react-icons/lib/io/arrow-swap'
import Statistic from 'react-icons/lib/io/stats-bars'
import Skip from 'react-icons/lib/io/forward'
import Help from 'react-icons/lib/io/help'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'

const Icons = {
    [Constants.ASSIT_NAME_REDO]: Redo,
    [Constants.ASSIT_NAME_INFINITE]: Infinite,
    [Constants.ASSIT_NAME_REDUCE]: Reduce,
    [Constants.ASSIT_NAME_STATISTIC]: Statistic,
    [Constants.ASSIT_NAME_SKIP]: Skip,
    [Constants.ASSIT_NAME_HELP]: Help,
}

type Props = {
    trigger: Trigger,
    name: string,
    assist: number,
    active: boolean,
}

export default class Assit extends React.Component<Props> {
    render() {
        if (!(this.props.name in Icons)) {
            return null
        }

        let HintIcon: any = Icons[this.props.name]
        if (this.props.active) {
            let action: any = this.props.trigger.call.bind(
                this.props.trigger,
                Trigger.ACTION_USE,
                this.props.assist,
            )
            return (
                <span onClick={action}>
                    <HintIcon />
                </span>
            )
        } else {
            return (
                <span>
                    <HintIcon />
                </span>
            )
        }
    }
}