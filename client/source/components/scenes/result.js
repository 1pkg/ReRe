import Lodash from 'lodash'
import React from 'react'

import Base from './base'
import Subject from './../blocks/subject/source'
import Correct from './../blocks/options/correct'
import Wrong from './../blocks/options/wrong'
import Toolbar from './../blocks/toolbar/short'

export default class extends React.Component {
    subject() {
        return <Subject subject={this.props.state.task.subject} />
    }

    options() {
        return Lodash.map(this.props.state.task.options, (option, index) => {
            let Option =
                option.name === this.props.state.option ? Correct : Wrong
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
                subject={this.subject()}
                options={this.options()}
                toolbar={this.toolbar()}
            />
        )
    }
}
