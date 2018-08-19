import React from 'react'
import { FaStar } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    mark = async () => {
        this.props.trigger.call(Trigger.ACTION_MARK, 'star')
    }

    render() {
        return <Button glyph={<FaStar />} action={this.mark} hint={'upvote'} />
    }
}
