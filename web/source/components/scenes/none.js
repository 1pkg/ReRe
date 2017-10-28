// @flow

import React from 'react'
import Antd from 'antd'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'

import Next from './../blocks/toolbar/widgets/next'

type Props = {
    trigger: Trigger,
}

export default class Main extends React.Component<Props> {
    render() {
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
                    />
                    <Antd.Layout.Sider
                        collapsible={false}
                        defaultCollapsed={true}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Next trigger={this.props.trigger} />
                    </Antd.Layout.Sider>
                </Antd.Layout>
            </Antd.Layout>
        )
    }
}
