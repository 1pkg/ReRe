import Lodash from 'lodash'
import React from 'react'

import Base from './base'
import Subject from './../blocks/subject/source'
import Correct from './../blocks/options/correct'
import Wrong from './../blocks/options/wrong'

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
