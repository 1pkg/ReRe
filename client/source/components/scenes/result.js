import Lodash from 'lodash'
import React from 'react'

import { Short as Toolbar } from './../blocks/toolbar'
import { Source as Subject } from './../blocks/subject'
import { Correct, Wrong } from './../blocks/option'
import Base from './base'

export default class extends React.Component {
    subject() {
        return <Subject subject={this.props.state.task.subject} />
    }

    options() {
        return Lodash.map(this.props.state.task.options, (option, index) => {
            ++index
            const Option = this.props.state.option === index ? Correct : Wrong
            return <Option key={index} option={option} />
        })
    }

    toolbar() {
        return (
            <Toolbar
                state={this.props.state}
                trigger={this.props.trigger}
                settings={this.props.state.settings}
                timestamp={this.props.state.timestamp}
            />
        )
    }

    render() {
        return (
            <Base
                trigger={this.props.trigger}
                state={this.props.state}
                settings={this.props.state.settings}
                subject={this.subject()}
                options={this.options()}
                toolbar={this.toolbar()}
                option={this.props.state.option}
            />
        )
    }
}
