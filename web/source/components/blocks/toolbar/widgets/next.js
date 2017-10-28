// @flow

import React from 'react'
import Login from 'react-icons/lib/io/log-in'

import Trigger from './../../../../actions/trigger'
import Button from './../button'

type Props = {
    trigger: Trigger,
}

export default class Next extends React.Component<Props> {
    action = () => {
        this.props.trigger.call(Trigger.ACTION_INITIALIZE)
    }

    render() {
        return (
            <Button pictogram={<Login />} hint="next" onClick={this.action} />
        )
    }
}
