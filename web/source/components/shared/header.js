// @flow

import React from 'react'
import Lodash from 'lodash'

import * as Model from './../../model'
import Trigger from './../../actions/trigger'
import * as Constants from './../../constants'
import * as Colors from './../../colors'

type Props = {
    trigger: Trigger,
    score: number,
}

export default class Header extends React.Component<Props> {
    render() {
        return (
            <div
                style={{
                    alignSelf: 'flex-end',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    fontWeight: 'bold',
                    fontSize: '1.5em',
                }}
            >
                <div>
                    <span style={{ color: Colors.COLOR_SECOND }}>WIT</span>
                    &nbsp;
                    {Lodash.isNaN(this.props.score) ? 0 : this.props.score}
                </div>
            </div>
        )
    }
}
