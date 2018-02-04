// @flow

import Lodash from 'lodash'
import React from 'react'
import Time from 'react-icons/lib/io/ios-time-outline'
import Infinite from 'react-icons/lib/io/ios-infinite-outline'

import Trigger from '~/actions/trigger'
import Mark from './../mark'

type Props = {
    trigger: Trigger,
    timestamp: number,
    duration: number,
}

export default class extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return (
            !Lodash.isEqual(props, this.props) ||
            this.props.timestamp != this.props.trigger.timestamp()
        )
    }

    render() {
        if (Lodash.isNaN(this.props.timestamp)) {
            return (
                <Mark content={<Infinite />} pictogram={<Time />} hint="time" />
            )
        }

        let difftimestamp: number =
            this.props.duration -
            (this.props.trigger.timestamp() - this.props.timestamp)
        return <Mark content={difftimestamp} pictogram={<Time />} hint="time" />
    }
}
