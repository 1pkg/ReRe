// @flow

import React from 'react'
import Antd from 'antd'

type Props = {
    children: string,
    hint: string,
}

export default class Positive extends React.Component<Props> {
    render() {
        return (
            <Antd.Card
                style={{
                    width: '30%',
                    height: '100%',
                }}
                bodyStyle={{ height: '100%', width: '100%', padding: '1.0em' }}
                noHovering={true}
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
