import React from 'react'
import { FacebookShareButton } from 'react-share'
import Facebook from 'react-icons/lib/fa/facebook'

import { Url } from '~/helpers'
import Button from './button'

export default class extends React.Component {
    render() {
        return (
            <FacebookShareButton
                url={Url.current()}
                quote={this.props.settings['share-title']}
            >
                <Button glyph={<Facebook />} hint={'share'} />
            </FacebookShareButton>
        )
    }
}
