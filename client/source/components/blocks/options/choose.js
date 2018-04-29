import React from 'react'

import Trigger from '~/actions/trigger'
import Option from './option'

export default class extends React.Component {
    choose = () => {
        this.props.trigger.call(Trigger.ACTION_CHOOSE, this.props.index)
    }

    render() {
        return (
            <Option
                option={this.props.option}
                action={this.choose}
                mobile={this.props.mobile}
                wrapper="choose"
            />
        )
    }
}
