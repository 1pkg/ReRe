import React from 'react'
import Refresh from 'react-icons/lib/fa/refresh'

import Trigger from '~/actions/trigger'
import Button from './button'

export default class extends React.Component {
    redo = () => {
        this.props.trigger.call(Trigger.ACTION_REMAKE)
    }

    render() {
        return (
            <Button
                glyph={<Refresh />}
                action={this.redo}
                mobile={this.props.mobile}
            />
        )
    }
}
