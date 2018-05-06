import React from 'react'
import DoubleUp from 'react-icons/lib/fa/angle-double-up'
import DoubleDown from 'react-icons/lib/fa/angle-double-down'

import Button from './button'

export default class extends React.Component {
    render() {
        return this.props.full ? (
            <Button glyph={<DoubleUp />} action={this.props.toggle} />
        ) : (
            <Button glyph={<DoubleDown />} action={this.props.toggle} />
        )
    }
}
