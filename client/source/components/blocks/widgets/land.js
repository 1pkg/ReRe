import React from 'react'
import Home from 'react-icons/lib/fa/home'

import Trigger from '~/actions/trigger'
import { History } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    land = async () => {
        await this.props.trigger.call(Trigger.ACTION_LAND)
        History.push(Trigger.STATUS_LAND)
    }

    render() {
        return <Button glyph={<Home />} action={this.land} hint={'home'} />
    }
}
