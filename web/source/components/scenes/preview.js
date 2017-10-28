// @flow

import React from 'react'
import Antd from 'antd'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'

type Props = {
    trigger: Trigger,
    state: Model.State,
}

export default class Main extends React.Component<Props> {
    render() {
        if (!this.props.state || !this.props.state.entry) {
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
                    />
                    <Antd.Layout.Sider
                        collapsible={false}
                        defaultCollapsed={true}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </Antd.Layout>
            </Antd.Layout>
        )
    }
}
