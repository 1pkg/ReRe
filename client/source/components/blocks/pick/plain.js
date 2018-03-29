import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'

import Trigger from '~/actions/trigger'
import Pending from './option/pending'
import Positive from './option/positive'
import Negative from './option/negative'

export default class Main extends React.Component {
    shouldComponentUpdate(props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <Reflexbox.Flex auto>
                <Reflexbox.Box flex auto justify="space-between">
                    {Lodash.map(this.props.options, (option, index) => {
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
                    })}
                </Reflexbox.Box>
            </Reflexbox.Flex>
        )
    }
}
