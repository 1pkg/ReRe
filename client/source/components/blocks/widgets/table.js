import React from 'react'
import { FaTable } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    table = async () => {
        this.props.trigger.call(Trigger.ACTION_TABLE)
    }

    render() {
        return (
            <Button glyph={<FaTable />} action={this.table} hint={'rating'} />
        )
    }
}
