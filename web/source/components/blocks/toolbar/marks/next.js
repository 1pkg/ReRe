// @flow

import React from 'react'
import Login from 'react-icons/lib/io/log-in'

import Trigger from '~/actions/trigger'
import Toggle from './../toggle'

type Props = {
    trigger: Trigger,
}

export default class extends React.Component<Props> {
    action = () => {
        this.props.trigger.call(Trigger.ACTION_INITIALIZE)
    }

    render() {
        return (
            <Toggle pictogram={<Login />} hint="next" onClick={this.action} />
        )
    }
}
