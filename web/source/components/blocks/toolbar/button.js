// @flow

import React from 'react'
import Antd from 'antd'

type Props = {
    pictogram: any,
    hint: string,
    onClick: () => void,
}

export default class Button extends React.Component<Props> {
    render() {
        return (
            <div>
                <div
                    style={{
                        textAlign: 'center',
                        width: '100%',
                        height: '3.0em',
                        background: 'white',
                    }}
                    onClick={this.props.onClick}
                >
                    <div>{this.props.pictogram}</div>
                    <div>{this.props.hint}</div>
                </div>
                <hr />
            </div>
        )
    }
}
