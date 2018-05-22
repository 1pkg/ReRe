import React from 'react'
import { RedditShareButton } from 'react-share'
import Reddit from 'react-icons/lib/fa/reddit'

import { Url } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    render() {
        return (
            <RedditShareButton
                url={Url.current()}
                title={this.props.settings['share-title']}
            >
                <Button glyph={<Reddit />} />
            </RedditShareButton>
        )
    }
}
