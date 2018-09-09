import React from 'react'

import Option from './base'

export default class extends React.Component {
    render() {
        return <Option option={this.props.option} disabled={false} />
    }
}
