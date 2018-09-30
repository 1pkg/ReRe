import React from 'react'

import Subject from './base'

export default class extends React.Component {
    render() {
        return (
            <Subject
                trigger={this.props.trigger}
                subject={this.props.subject}
                blobs={this.props.blobs}
            />
        )
    }
}
