// @flow

import React from 'react'
import Lodash from 'lodash'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'
import * as Colors from './../../colors'

import Option from './option'

type Props = {
    trigger: Trigger,
    options: Array<Model.Option>,
    option: number,
}

export default class Grid extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        flexGrow: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '1.5em',
                        borderWidth: '0.1em 0em 0.1em 0em',
                        borderStyle: 'solid',
                        color: Colors.COLOR_SECOND,
                    }}
                >
                    {Lodash.map(
                        this.props.options,
                        (option: Model.Option, index: number) => {
                            let result: ?boolean = Lodash.isNaN(
                                this.props.option,
                            )
                                ? null
                                : this.props.option === index
                            return (
                                <Option
                                    key={index}
                                    trigger={this.props.trigger}
                                    option={index}
                                    hint={option.hint}
                                    result={result}
                                >
                                    {option.name}
                                </Option>
                            )
                        },
                    )}
                </div>
            </div>
        )
    }
}
