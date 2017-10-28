// @flow

import React from 'react'
import Antd from 'antd'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'

import Pick from './../blocks/pick/main'
import Subject from './../blocks/subject/simple'
import Score from './../blocks/toolbar/widgets/score'
import Next from './../blocks/toolbar/widgets/next'

type Props = {
    trigger: Trigger,
    state: Model.State,
}

export default class Main extends React.Component<Props> {
    render() {
        if (
            !this.props.state ||
            !this.props.state.entry ||
            !this.props.state.task
        ) {
            return null
        }

        return (
            <Antd.Layout
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Antd.Layout
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Antd.Layout.Content
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Subject subject={this.props.state.task.subject} />
                        <Pick
                            trigger={this.props.trigger}
                            options={this.props.state.task.options}
                            option={NaN}
                        />
                    </Antd.Layout.Content>
                    <Antd.Layout.Sider
                        collapsible={false}
                        defaultCollapsed={true}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Score score={this.props.state.entry.score} />
                        <Next trigger={this.props.trigger} />
                    </Antd.Layout.Sider>
                </Antd.Layout>
            </Antd.Layout>
        )
    }
}
