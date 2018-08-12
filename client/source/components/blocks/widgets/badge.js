import React from 'react'

import Button from './button'

export default class extends React.Component {
    render() {
        return <Button glyph={this.props.text} hint={this.props.hint} />
    }
}
