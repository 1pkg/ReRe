// @flow

import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'

type Props = {
    children: string,
    hint: string,
}

export default class Negative extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <Reflexbox.Flex
                column
                w="30%"
                justify="space-between"
                style={{
                    borderStyle: 'solid',
                    borderWidth: '0.1em',
                    opacity: '0.3',
                }}
            >
                <Reflexbox.Box
                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    {this.props.children}
                </Reflexbox.Box>
                <Reflexbox.Box
                    style={{ textAlign: 'justify', fontWeight: 'normal' }}
                >
                    <q>{this.props.hint}</q>
                </Reflexbox.Box>
            </Reflexbox.Flex>
        )
    }
}
