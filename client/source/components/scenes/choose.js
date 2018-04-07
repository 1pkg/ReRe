import Lodash from 'lodash'
import React from 'react'

import Base from './base'
import Subject from './../blocks/subject/effect'
import Choose from './../blocks/options/choose'

export default class extends React.Component {
    subject() {
        return (
            <Subject
                subject={this.props.state.task.subject}
                effects={this.props.state.task.effects}
            />
        )
    }

    options() {
        return Lodash.map(this.props.state.task.options, (option, index) => {
            return (
                <Choose
                    key={index}
                    trigger={this.props.trigger}
                    index={index}
                    option={option}
                />
            )
        })
    }

    render() {
        return (
            <Base
                trigger={this.props.trigger}
                subject={this.subject()}
                options={this.options()}
            />
        )
    }
}
