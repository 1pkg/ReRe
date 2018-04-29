import React from 'react'
import Close from 'react-icons/lib/fa/close'

import Button from './button'

export default class extends React.Component {
    componentDidMount() {
        document.addEventListener('keydown', this.hotkey, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.hotkey, false)
    }

    hotkey = event => {
        if (event.keyCode === 27) {
            this.props.action()
        }
    }

    render() {
        return (
            <Button
                glyph={<Close />}
                action={this.props.action}
                mobile={this.props.mobile}
            />
        )
    }
}
