import React from 'react'
import { TwitterShareButton } from 'react-share'
import Twitter from 'react-icons/lib/fa/twitter'

import { Url } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    render() {
        return (
            <TwitterShareButton
                url={Url.current()}
                title={this.props.settings['share-title']}
            >
                <Button glyph={<Twitter />} hint={'share'} />
            </TwitterShareButton>
        )
    }
}
