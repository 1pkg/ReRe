// @flow

import React from 'react'

import Twitter from 'react-icons/lib/io/social-twitter-outline'
import Facebook from 'react-icons/lib/io/social-facebook-outline'

import Trigger from './../../../actions/trigger'

type Props = {
    trigger: Trigger,
}

export default class Share extends React.Component<Props> {
    render() {
        return (
            <div
                style={{
                    alignSelf: 'flex-end',
                    fontWeight: 'bold',
                    fontSize: '3em',
                }}
            >
                <span>
                    <Twitter />
                </span>
                <span>
                    <Facebook />
                </span>
            </div>
        )
    }
}
