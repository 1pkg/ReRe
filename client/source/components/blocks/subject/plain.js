// @flow

import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'

type Props = {
    subject: string,
}

export default class Subject extends React.Component<Props> {
    shouldComponentUpdate(props: Props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <Reflexbox.Flex
                auto
                style={{
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={this.props.subject}
                    alt={'todo'}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Reflexbox.Flex>
        )
    }
}
