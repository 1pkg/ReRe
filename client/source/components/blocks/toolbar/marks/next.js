import React from 'react'
import Login from 'react-icons/lib/io/log-in'

import Trigger from '~/actions/trigger'
import Toggle from './../toggle'

export default class extends React.Component {
    action = () => {
        this.props.trigger.call(Trigger.ACTION_FETCH)
    }

    render() {
        return (
            <Toggle pictogram={<Login />} hint="next" onClick={this.action} />
        )
    }
}
