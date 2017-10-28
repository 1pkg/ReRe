// @flow

import React from 'react'
import Antd from 'antd'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'

import Pick from './../blocks/pick/main'
import Subject from './../blocks/subject/effect'
import Score from './../blocks/toolbar/widgets/score'
import Timer from './../blocks/toolbar/widgets/timer'
import Assist from './../blocks/toolbar/widgets/assist'
import Reference from './../blocks/toolbar/widgets/reference'

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
            <Antd.Layout style={{ width: '100%', height: '100%' }}>
                <Antd.Layout style={{ width: '100%', height: '100%' }}>
                    <Antd.Layout.Content
                        style={{ width: '100%', height: '100%' }}
                    >
                        <Subject
                            trigger={this.props.trigger}
                            subject={this.props.state.task.subject}
                            effects={this.props.state.task.effects}
                        />
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
                            textAlign: 'center',
                        }}
                    >
                        <Score score={this.props.state.entry.score} />
                        <Timer
                            trigger={this.props.trigger}
                            timestamp={this.props.state.entry.timestamp}
                            duration={30}
                        />
                        <Assist
                            trigger={this.props.trigger}
                            assists={this.props.state.entry.assists}
                        />
                        {/* <Reference
                            message={this.props.state.task.reference.message}
                        /> */}
                    </Antd.Layout.Sider>
                </Antd.Layout>
            </Antd.Layout>
        )
    }
}
