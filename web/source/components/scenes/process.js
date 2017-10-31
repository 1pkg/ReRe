// @flow

import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'

import * as Model from '~/model'
import Trigger from '~/actions/trigger'
import Pick from './../blocks/pick/plain'
import Subject from './../blocks/subject/effect'
import Score from './../blocks/toolbar/marks/score'
import Timer from './../blocks/toolbar/marks/timer'
import Assist from './../blocks/toolbar/marks/assist'
import Reference from './../blocks/toolbar/marks/reference'

type Props = {
    trigger: Trigger,
    state: Model.State,
}

export default class extends React.Component<Props> {
    render() {
        if (
            !this.props.state ||
            !this.props.state.entry ||
            !this.props.state.task
        ) {
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
                    <Score score={this.props.state.entry.score} />
                    <Timer
                        trigger={this.props.trigger}
                        timestamp={this.props.state.entry.timestamp}
                        duration={30}
                    />
                    <Assist
                        trigger={this.props.trigger}
                        assists={Lodash.cloneDeep(
                            this.props.state.entry.assists,
                        )}
                    />
                    <Reference reference={this.props.state.task.reference} />
                </Reflexbox.Box>
            </Reflexbox.Flex>
        )
    }
}
