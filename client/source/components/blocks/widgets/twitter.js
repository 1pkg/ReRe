import React from 'react'
import { TwitterShareButton } from 'react-share'
import Twitter from 'react-icons/lib/fa/twitter'

import Trigger from '~/actions/trigger'
import { Url } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    mark = async () => {
        if ('l' in Url.parse().query) {
            this.props.trigger.call(Trigger.ACTION_MARK, 'twitter')
        }
    }

    render() {
        return (
            <TwitterShareButton
                url={Url.current()}
                title={this.props.settings['share-title']}
                onShareWindowClose={this.mark}
            >
                <Button glyph={<Twitter />} />
            </TwitterShareButton>
        )
    }
}
