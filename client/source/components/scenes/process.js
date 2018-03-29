import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'

import Trigger from '~/actions/trigger'
import Pick from './../blocks/pick/plain'
import Subject from './../blocks/subject/effect'
import Timer from './../blocks/toolbar/marks/timer'

export default class extends React.Component {
    render() {
        if (!this.props.state || !this.props.state.task) {
            return null
        }

        return (
            <Reflexbox.Flex auto>
                <Reflexbox.Box flex column w="90%">
                    <Reflexbox.Box flex auto style={{ height: '80%' }}>
                        <Subject
                            trigger={this.props.trigger}
                            subject={this.props.state.task.subject}
                            effects={this.props.state.task.effects}
                        />
                    </Reflexbox.Box>
                    <Reflexbox.Box flex style={{ height: '20%' }} mt="1.0em">
                        <Pick
                            trigger={this.props.trigger}
                            options={this.props.state.task.options}
                            option={NaN}
                        />
                    </Reflexbox.Box>
                </Reflexbox.Box>
                <Reflexbox.Box w="10%">
                    <Timer
                        trigger={this.props.trigger}
                        timestamp={100}
                        duration={30}
                    />
                </Reflexbox.Box>
            </Reflexbox.Flex>
        )
    }
}
