import Lodash from 'lodash'
import React from 'react'

import { Full as Toolbar } from './../blocks/toolbar'
import { Effect as Subject } from './../blocks/subject'
import { Choose } from './../blocks/option'
import Base from './base'

export default class extends React.Component {
    subject() {
        return (
            <Subject
                subject={this.props.state.task.subject}
                effects={this.props.state.task.effects}
                shaders={this.props.state.shaders}
            />
        )
    }

    options() {
        return Lodash.map(this.props.state.task.options, (option, index) => {
            ++index
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

    toolbar() {
        return (
            <Toolbar
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
            />
        )
    }
}
