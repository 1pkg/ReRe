import React from 'react'
import DoubleDown from 'react-icons/lib/fa/angle-double-down'

import Button from './button'

export default class extends React.Component {
    render() {
        return (
            <Button
                glyph={<DoubleDown />}
                action={this.props.toggle}
                mobile={this.props.mobile}
            />
        )
    }
}
