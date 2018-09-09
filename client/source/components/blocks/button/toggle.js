import React from 'react'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

import Button from './base'

export default class extends React.Component {
    render() {
        return this.props.full ? (
            <Button
                glyph={FaAngleDoubleUp}
                hint={'show'}
                action={this.props.toggle}
            />
        ) : (
            <Button
                glyph={FaAngleDoubleDown}
                hint={'hide'}
                action={this.props.toggle}
            />
        )
    }
}
