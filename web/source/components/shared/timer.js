// @flow

import React from 'react'
import Lodash from 'lodash'

import Pinpoint from 'react-icons/lib/io/pinpoint'
import Infinite from 'react-icons/lib/io/ios-infinite'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'
import * as Colors from './../../colors'

type Props = {
    trigger: Trigger,
    timestamp: number,
    duration: number,
}

export default class Timer extends React.Component<Props> {
    render() {
        if (Lodash.isNaN(this.props.timestamp)) {
            return (
                <div style={{ position: 'relative' }}>
                    <Pinpoint />
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            transform:
                                'translateX(-0.125em) translateY(-1.6em)',
                            fontSize: '0.5em',
                        }}
                    >
                        {<Infinite />}
                    </div>
                </div>
            )
        } else {
            let difftimestamp: number =
                this.props.duration -
                (this.props.trigger.timestamp() - this.props.timestamp)
            return (
                <div style={{ position: 'relative' }}>
                    <Pinpoint />
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            transform:
                                'translateX(-0.125em) translateY(-1.5em)',
                            fontSize: '0.5em',
                            color:
                                difftimestamp >= this.props.duration * 0.5
                                    ? Colors.COLOR_POSTIVE
                                    : Colors.COLOR_NEGATIVE,
                        }}
                    >
                        {difftimestamp}
                    </div>
                </div>
            )
        }
    }
}
