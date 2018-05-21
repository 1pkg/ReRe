import React from 'react'
import { RedditShareButton } from 'react-share'
import Reddit from 'react-icons/lib/fa/reddit'

import Trigger from '~/actions/trigger'
import { Url } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    mark = async () => {
        let state = this.props.trigger.state()
        if (
            state.status === Trigger.STATUS_ACTIVE ||
            state.status === Trigger.STATUS_CORRECT ||
            state.status === Trigger.STATUS_WRONG
        ) {
            this.props.trigger.call(Trigger.ACTION_MARK, 'reddit')
        }
    }

    render() {
        return (
            <RedditShareButton
                url={Url.current()}
                title={this.props.settings['share-title']}
                onShareWindowClose={this.mark}
            >
                <Button glyph={<Reddit />} />
            </RedditShareButton>
        )
    }
}
