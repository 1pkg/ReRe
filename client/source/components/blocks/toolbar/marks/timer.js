import Lodash from 'lodash'
import React from 'react'
import Time from 'react-icons/lib/io/ios-time-outline'
import Infinite from 'react-icons/lib/io/ios-infinite-outline'

import Trigger from '~/actions/trigger'
import Mark from './../mark'

export default class extends React.Component {
    shouldComponentUpdate(props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        if (Lodash.isNaN(this.props.timestamp)) {
            return (
                <Mark content={<Infinite />} pictogram={<Time />} hint="time" />
            )
        }

        let difftimestamp: number = 100
        return <Mark content={difftimestamp} pictogram={<Time />} hint="time" />
    }
}
