// @flow

import Lodash from 'lodash'
import React from 'react'

import Mark from './../mark'

type Props = {
    score: number,
}

export default class extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return <Mark content={this.props.score} pictogram="db" hint="score" />
    }
}
