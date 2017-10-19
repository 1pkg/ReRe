// @flow

import React from 'react'
import Lodash from 'lodash'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'

import Timer from './timer'
import Assit from './assit'

type Props = {
    trigger: Trigger,
    assists: Array<string>,
    timestamp: number,
    duration: number,
    active: boolean,
}

export default class Toolbar extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return (
            !Lodash.isEqual(props, this.props) ||
            this.props.timestamp != this.props.trigger.timestamp()
        )
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '2em',
                }}
            >
                <Timer
                    trigger={this.props.trigger}
                    timestamp={this.props.timestamp}
                    duration={this.props.duration}
                />
                <div>
                    {Lodash.map(
                        this.props.assists,
                        (assist: string, index: number) => {
                            return (
                                <Assit
                                    key={index}
                                    trigger={this.props.trigger}
                                    name={assist}
                                    assist={index}
                                    active={this.props.active}
                                />
                            )
                        },
                    )}
                </div>
            </div>
        )
    }
}
