import { map } from 'lodash'
import React from 'react'

import { Partial as Toolbar } from './../blocks/toolbar'
import { Source as Subject } from './../blocks/subject'
import { Correct, Wrong } from './../blocks/option'
import Base from './base'

export default class extends React.Component {
    subject() {
        return (
            <Subject
                subject={this.props.state.task.subject}
                blobs={this.props.state.blobs}
            />
        )
    }

    options() {
        return map(this.props.state.task.options, (option, index) => {
            const Option =
                this.props.state.option === index + 1 ? Correct : Wrong
            return <Option key={index + 1} option={option} />
        })
    }

    render() {
        return (
            <Base
                state={this.props.state}
                trigger={this.props.trigger}
                subject={this.subject()}
                options={this.options()}
                toolbar={Toolbar}
            />
        )
    }
}
