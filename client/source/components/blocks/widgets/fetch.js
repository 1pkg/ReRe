import React from 'react'
import DoubleRight from 'react-icons/lib/fa/angle-double-right'

import Trigger from '~/actions/trigger'
import { History } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    fetch = async () => {
        let state = await this.props.trigger.call(Trigger.ACTION_FETCH)
        History.push(state.task.label)
    }

    render() {
        return (
            <Button glyph={<DoubleRight />} action={this.fetch} hint={'next'} />
        )
    }
}
