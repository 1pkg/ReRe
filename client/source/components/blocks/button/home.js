import React from 'react'
import { FaHome } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './base'

export default class extends React.Component {
    home = async () => {
        this.props.trigger.call(Trigger.ACTION_HOME)
    }

    render() {
        return <Button glyph={FaHome} hint={'home'} action={this.home} />
    }
}
