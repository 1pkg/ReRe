// @flow

import React from 'react'
import Antd from 'antd'
import Lodash from 'lodash'

import Trigger from './../../../../actions/trigger'
import Widget from './../widget'

type Props = {
    score: number,
}

export default class Timer extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <Widget
                content={this.props.score}
                pictogram={<Antd.Icon type="database" />}
                hint="score"
            />
        )
    }
}
