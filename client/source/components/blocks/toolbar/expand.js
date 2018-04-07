import React from 'react'
import DoubleUp from 'react-icons/lib/fa/angle-double-up'

import Button from './button'

export default class extends React.Component {
    render() {
        return <Button glyph={<DoubleUp />} action={this.props.toggle} />
    }
}
