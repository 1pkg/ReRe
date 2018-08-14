import React from 'react'
import { FacebookShareButton } from 'react-share'
import Facebook from 'react-icons/lib/fa/facebook'

import Trigger from '~/actions/trigger'
import { Url } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    share = async () => {
        this.props.trigger.call(Trigger.ACTION_SHARE, 'facebook')
    }

    render() {
        return (
            <FacebookShareButton
                url={Url.current()}
                onShareWindowClose={this.share}
                quote={this.props.settings['share-title']}
            >
                <Button glyph={<Facebook />} hint={'share'} />
            </FacebookShareButton>
        )
    }
}
