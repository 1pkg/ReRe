import React from 'react'
import DoubleRight from 'react-icons/lib/fa/angle-double-right'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    fetch = async () => {
        if ('label' in this.props && this.props.label) {
            await this.props.trigger.call(Trigger.ACTION_CHOOSE, -1, true)
        }
        this.props.trigger.call(Trigger.ACTION_FETCH)
    }

    render() {
        return (
            <Button glyph={<DoubleRight />} action={this.fetch} hint={'next'} />
        )
    }
}
