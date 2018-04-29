import React from 'react'

import Subject from './base'

export default class extends React.Component {
    render() {
        return <Subject subject={this.props.subject} />
    }
}
