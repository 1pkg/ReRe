// @flow

import React from 'react'
import Antd from 'antd'
import Lodash from 'lodash'
import Chatbubble from 'react-icons/lib/io/ios-chatbubble-outline'

import Widget from './../widget'

type Props = {
    message: string,
}

export default class Reference extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <Widget
                content={this.props.message}
                pictogram={<Chatbubble />}
                hint="refence"
            />
        )
    }
}
