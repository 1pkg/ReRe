// @flow

import Lodash from 'lodash'
import React from 'react'
import Chatbubble from 'react-icons/lib/io/ios-chatbubble-outline'

import Mark from './../mark'

type Props = {
    reference: string,
}

export default class extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        if (Lodash.isEmpty(this.props.reference)) {
            return null
        }

        return (
            <Mark
                content={this.props.reference}
                pictogram={<Chatbubble />}
                hint="refence"
            />
        )
    }
}
