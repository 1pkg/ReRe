import React from 'react'
import Star from 'react-icons/lib/fa/star-o'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    mark = async () => {
        this.props.trigger.call(Trigger.ACTION_MARK, 'star')
    }

    render() {
        return <Button glyph={<Star />} action={this.mark} hint={'upvote'} />
    }
}
