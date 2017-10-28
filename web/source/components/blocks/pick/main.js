// @flow

import React from 'react'
import Lodash from 'lodash'

import * as Model from './../../../model'
import Trigger from './../../../actions/trigger'

import Pending from './option/pending'
import Positive from './option/positive'
import Negative from './option/negative'

type Props = {
    trigger: Trigger,
    options: Array<Model.Option>,
    option: number,
}

export default class Main extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '20%',
                    marginTop: '1em',
                    marginBottom: '1em',
                    paddingLeft: '10%',
                    paddingRight: '10%',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'space-between',
                        fontSize: '3.0em',
                    }}
                >
                    {Lodash.map(
                        this.props.options,
                        (option: Model.Option, index: number) => {
                            if (Lodash.isNaN(this.props.option)) {
                                return (
                                    <Pending
                                        key={index}
                                        trigger={this.props.trigger}
                                        option={index}
                                        hint={option.hint}
                                    >
                                        {option.name}
                                    </Pending>
                                )
                            } else if (this.props.option === index) {
                                return (
                                    <Positive key={index} hint={option.hint}>
                                        {option.name}
                                    </Positive>
                                )
                            } else {
                                return (
                                    <Negative key={index} hint={option.hint}>
                                        {option.name}
                                    </Negative>
                                )
                            }
                        },
                    )}
                </div>
            </div>
        )
    }
}
