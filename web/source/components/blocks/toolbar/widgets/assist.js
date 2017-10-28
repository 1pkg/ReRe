// @flow

import React from 'react'
import Antd from 'antd'
import Lodash from 'lodash'
import Redo from 'react-icons/lib/io/loop'
import Infinite from 'react-icons/lib/io/ios-infinite'
import Reduce from 'react-icons/lib/io/arrow-swap'
import Statistic from 'react-icons/lib/io/stats-bars'
import Skip from 'react-icons/lib/io/forward'
import Help from 'react-icons/lib/io/help'

import Trigger from './../../../../actions/trigger'
import * as Constants from './../../../../constants'
import Widget from './../widget'

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

export default class Assis extends React.Component<Props> {
    // shouldComponentUpdate(props: Props) {
    //     return !Lodash.isEqual(props, this.props)
    // }

    get(name: string, assist: number): any {
        if (!(name in Icons)) {
            return null
        }

        let HintIcon: any = Icons[name]
        let action: any = this.props.trigger.call.bind(
            this.props.trigger,
            Trigger.ACTION_USE,
            assist,
        )
        return (
            <span key={assist} onClick={action}>
                <HintIcon />
            </span>
        )
    }

    render() {
        let content = (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '2em',
                }}
            >
                <div>
                    {Lodash.map(
                        this.props.assists,
                        (assist: string, index: number) => {
                            return this.get(assist, index)
                        },
                    )}
                </div>
            </div>
        )
        return <Widget content={content} pictogram={<Help />} hint="assists" />
    }
}
