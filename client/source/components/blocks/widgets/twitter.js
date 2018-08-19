import React from 'react'
import { TwitterShareButton } from 'react-share'
import { FaTwitter } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import { Url } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    share = async () => {
        this.props.trigger.call(Trigger.ACTION_SHARE, 'twitter')
    }

    render() {
        return (
            <TwitterShareButton
                url={Url.current()}
                onShareWindowClose={this.share}
                title={this.props.settings['share-title']}
            >
                <Button glyph={<FaTwitter />} hint={'share'} />
            </TwitterShareButton>
        )
    }
}
