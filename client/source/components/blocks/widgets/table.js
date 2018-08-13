import React from 'react'
import Table from 'react-icons/lib/fa/table'

import Trigger from '~/actions/trigger'
import { History } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    table = async () => {
        await this.props.trigger.call(Trigger.ACTION_TABLE)
        History.push(Trigger.STATUS_TABLE)
    }

    render() {
        return <Button glyph={<Table />} action={this.table} hint={'rating'} />
    }
}
