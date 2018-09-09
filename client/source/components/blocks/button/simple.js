import React from 'react'

import Button from './base'

export default class extends React.Component {
    render() {
        return (
            <Button
                glyph={this.props.glyph}
                hint={this.props.hint}
                action={this.props.action}
            />
        )
    }
}
