// @flow

import React from 'react'
import * as Reflexbox from 'reflexbox'

import * as Model from '~/model'
import Trigger from '~/actions/trigger'
import Next from './../blocks/toolbar/marks/next'

type Props = {
    trigger: Trigger,
}

export default class extends React.Component<Props> {
    render() {
        return (
            <Reflexbox.Flex auto>
                <Reflexbox.Box flex column w="90%" />
                <Reflexbox.Box w="10%">
                    <Next trigger={this.props.trigger} />
                </Reflexbox.Box>
            </Reflexbox.Flex>
        )
    }
}
