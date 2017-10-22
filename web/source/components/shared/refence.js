// @flow

import React from 'react'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'

type Props = {
    trigger: Trigger,
    message: string,
    link: string,
}

export default class Reference extends React.Component<Props> {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        flexGrow: 0.5,
                        padding: '1em 0em 1em 0em',
                        fontSize: '2em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <a href={this.props.link}>\\{this.props.message}\\</a>
                </div>
            </div>
        )
    }
}
