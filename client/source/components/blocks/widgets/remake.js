import React from 'react'
import Refresh from 'react-icons/lib/fa/refresh'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    remake = async () => {
        this.props.trigger.call(Trigger.ACTION_REMAKE)
    }

    render() {
        return <Button glyph={<Refresh />} action={this.remake} hint={'redo'} />
    }
}
