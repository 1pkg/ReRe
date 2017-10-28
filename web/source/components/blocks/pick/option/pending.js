// @flow

import React from 'react'
import Antd from 'antd'

import Trigger from './../../../../actions/trigger'

type Props = {
    trigger: Trigger,
    option: number,
    children: string,
    hint: string,
}

export default class Pending extends React.Component<Props> {
    chose = () => {
        this.props.trigger.call(Trigger.ACTION_CHOSE, this.props.option)
    }

    render() {
        return (
            <Antd.Card
                style={{
                    width: '30%',
                    height: '100%',
                }}
                bodyStyle={{ height: '100%', width: '100%', padding: '1.0em' }}
                onClick={this.chose}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <span
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '2.0em',
                            opacity: '1.0',
                        }}
                    >
                        {this.props.children}
                    </span>
                    <span
                        style={{
                            textAlign: 'justify',
                            fontWeight: 'normal',
                            fontSize: '1.0em',
                            opacity: '0.5',
                        }}
                    >
                        <q>{this.props.hint}</q>
                    </span>
                </div>
            </Antd.Card>
        )
    }
}
