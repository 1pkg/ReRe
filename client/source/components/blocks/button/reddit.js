import React from 'react'
import { RedditShareButton } from 'react-share'
import { FaRedditAlien } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import { Url } from '~/helpers'
import Button from './base'

export default class extends React.Component {
    share = async () => {
        this.props.trigger.call(Trigger.ACTION_SHARE, 'reddit')
    }

    render() {
        return (
            <RedditShareButton
                url={Url.current()}
                onShareWindowClose={this.share}
                title={SHARE_TITLE}
            >
                <Button glyph={FaRedditAlien} hint={'share'} />
            </RedditShareButton>
        )
    }
}
