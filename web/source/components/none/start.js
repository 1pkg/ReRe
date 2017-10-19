// @flow

import React from 'react'

import ArrowRight from 'react-icons/lib/io/arrow-right-b'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'

type Props = {
    trigger: Trigger,
}

export default class Start extends React.Component<Props> {
    render() {
        let action: any = this.props.trigger.call.bind(
            this.props.trigger,
            Trigger.ACTION_INITIALIZE,
        )
        return (
            <div
                style={{
                    alignSelf: 'center',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '4em',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={action}
                >
                    <span>START</span>
                    &nbsp;
                    <ArrowRight />
                </div>
            </div>
        )
    }
}
