// @flow

import React from 'react'
import Antd from 'antd'
import Lodash from 'lodash'

import Button from './button'

type Props = {
    content: any,
    pictogram: any,
    hint: string,
}

type State = { active: boolean }

export default class Timer extends React.Component<Props, State> {
    toggle = () => {
        this.setState((state: State) => {
            return { active: !state.active }
        })
    }

    constructor(props: Props) {
        super(props)
        this.state = { active: false }
    }

    shouldComponentUpdate(props: Props, state: State) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        return (
            <Antd.Popover
                placement="left"
                content={this.props.content}
                visible={this.state.active}
            >
                <Button
                    pictogram={this.props.pictogram}
                    hint={this.props.hint}
                    onClick={this.toggle}
                />
            </Antd.Popover>
        )
    }
}
