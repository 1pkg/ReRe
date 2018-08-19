import React from 'react'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

import Button from './button'

export default class extends React.Component {
    render() {
        return this.props.full ? (
            <Button
                glyph={<FaAngleDoubleUp />}
                action={this.props.toggle}
                hint={'show'}
            />
        ) : (
            <Button
                glyph={<FaAngleDoubleDown />}
                action={this.props.toggle}
                hint={'hide'}
            />
        )
    }
}
