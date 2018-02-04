// @flow

import React from 'react'
import * as Reflexbox from 'reflexbox'

import * as Model from '~/model'
import Trigger from '~/actions/trigger'

type Props = {
    trigger: Trigger,
    state: Model.State,
}

export default class extends React.Component<Props> {
    render() {
        if (!this.props.state || !this.props.state.entry) {
            return null
        }

        return <Reflexbox.Flex auto />
    }
}
