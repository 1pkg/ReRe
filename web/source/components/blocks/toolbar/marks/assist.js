// @flow

import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'
import Redo from 'react-icons/lib/io/loop'
import Infinite from 'react-icons/lib/io/ios-infinite'
import Reduce from 'react-icons/lib/io/arrow-swap'
import Statistic from 'react-icons/lib/io/stats-bars'
import Skip from 'react-icons/lib/io/forward'
import Help from 'react-icons/lib/io/help'

import * as Constants from '~/constants'
import Trigger from '~/actions/trigger'
import Mark from './../mark'

const Icons = {
    [Constants.ASSIT_NAME_REDO]: Redo,
    [Constants.ASSIT_NAME_INFINITE]: Infinite,
    [Constants.ASSIT_NAME_REDUCE]: Reduce,
    [Constants.ASSIT_NAME_STATISTIC]: Statistic,
    [Constants.ASSIT_NAME_SKIP]: Skip,
    [Constants.ASSIT_NAME_HELP]: Help,
}

type Props = {
    trigger: Trigger,
    assists: Array<string>,
}

export default class extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        if (Lodash.isEmpty(this.props.assists)) {
            return null
        }

        let holder = (
            <Reflexbox.Flex auto justify="space-between">
                {Lodash.map(
                    this.props.assists,
                    (assist: string, index: number) => {
                        if (!(assist in Icons)) {
                            return null
                        }

                        let HintIcon: any = Icons[assist]
                        let action: any = this.props.trigger.call.bind(
                            this.props.trigger,
                            Trigger.ACTION_USE,
                            index,
                        )
                        return <HintIcon key={index} onClick={action} />
                    },
                )}
            </Reflexbox.Flex>
        )
        return <Mark content={holder} pictogram={<Help />} hint="assist" />
    }
}
