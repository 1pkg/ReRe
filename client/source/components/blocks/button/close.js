import React from 'react'
import { FaTimes } from 'react-icons/fa'

import { Analytic } from '~/helpers'
import Button from './base'

export default class extends React.Component {
    hotkey = event => {
        if (event.keyCode === 27) {
            Analytic.event(Analytic.EVENT_CLICK, { action: 'esc' })
            this.props.action()
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.hotkey, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.hotkey, false)
    }

    render() {
        return <Button glyph={FaTimes} action={this.props.action} />
    }
}
