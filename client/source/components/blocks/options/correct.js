import React from 'react'

import Option from './option'

export default class extends React.Component {
    render() {
        return (
            <Option
                option={this.props.option}
                mobile={this.props.mobile}
                wrapper="correct"
            />
        )
    }
}
