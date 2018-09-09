import React from 'react'
import { FaStar } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './base'

export default class extends React.Component {
    mark = async () => {
        this.props.trigger.call(Trigger.ACTION_MARK, 'upvote')
    }

    render() {
        return <Button glyph={FaStar} hint={'upvote'} action={this.mark} />
    }
}
