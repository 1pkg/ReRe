import React from 'react'
import { FaCheck } from 'react-icons/fa'

import Button from './base'

export default class extends React.Component {
    render() {
        return <Button glyph={FaCheck} action={this.props.action} />
    }
}
