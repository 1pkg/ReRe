import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'

import Trigger from '~/actions/trigger'

export default class Pending extends React.Component {
    chose = () => {
        this.props.trigger.call(Trigger.ACTION_CHOOSE, this.props.option)
    }

    shouldComponentUpdate(props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <Reflexbox.Flex
                column
                w="30%"
                justify="space-between"
                onClick={this.chose}
                style={{ borderStyle: 'solid', borderWidth: '0.1em' }}
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
