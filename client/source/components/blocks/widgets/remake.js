import React from 'react'
import Refresh from 'react-icons/lib/fa/refresh'

import Trigger from '~/actions/trigger'
import { History } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    remake = async () => {
        let state = await this.props.trigger.call(Trigger.ACTION_REMAKE)
        History.push(state.task.label)
    }

    render() {
        return <Button glyph={<Refresh />} action={this.remake} hint={'redo'} />
    }
}
