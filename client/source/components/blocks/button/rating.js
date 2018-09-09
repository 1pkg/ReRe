import React from 'react'
import { FaTable } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './base'

export default class extends React.Component {
    rating = async () => {
        this.props.trigger.call(Trigger.ACTION_RATING)
    }

    render() {
        return <Button glyph={FaTable} hint={'rating'} action={this.rating} />
    }
}
