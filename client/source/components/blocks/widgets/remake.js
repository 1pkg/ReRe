import React from 'react'
import { FaRedo } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    remake = async () => {
        this.props.trigger.call(Trigger.ACTION_REMAKE)
    }

    render() {
        return <Button glyph={<FaRedo />} action={this.remake} hint={'redo'} />
    }
}
