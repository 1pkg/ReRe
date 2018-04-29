import Lodash from 'lodash'
import React from 'react'

import Base from './base'
import Subject from './../blocks/subject/effect'
import Choose from './../blocks/options/choose'
import Toolbar from './../blocks/toolbar/full'

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
                    mobile={this.props.state.mobile}
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
                mobile={this.props.state.mobile}
                settings={this.props.state.settings}
                timestamp={this.props.state.timestamp}
            />
        )
    }

    render() {
        return (
            <Base
                state={this.props.state}
                subject={this.subject()}
                options={this.options()}
                toolbar={this.toolbar()}
            />
        )
    }
}
