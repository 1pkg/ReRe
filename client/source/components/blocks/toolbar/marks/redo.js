import React from 'react'
import Redo from 'react-icons/lib/io/loop'

import Trigger from '~/actions/trigger'
import Toggle from './../toggle'

export default class extends React.Component {
    action = () => {
        this.props.trigger.call(Trigger.ACTION_REDO)
    }

    render() {
        return <Toggle pictogram={<Redo />} hint="next" onClick={this.action} />
    }
}
