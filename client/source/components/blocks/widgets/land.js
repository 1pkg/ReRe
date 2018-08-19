import React from 'react'
import { FaHome } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    land = async () => {
        this.props.trigger.call(Trigger.ACTION_LAND)
    }

    render() {
        return <Button glyph={<FaHome />} action={this.land} hint={'home'} />
    }
}
