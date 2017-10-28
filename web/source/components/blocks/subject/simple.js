// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import Lodash from 'lodash'

type Props = {
    subject: string,
}

export default class Subject extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '70%',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={this.props.subject}
                    alt={'todo'}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        )
    }
}
