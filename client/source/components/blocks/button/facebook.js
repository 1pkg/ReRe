import React from 'react'
import { FacebookShareButton } from 'react-share'
import { FaFacebookF } from 'react-icons/fa'

import Trigger from '~/actions/trigger'
import { Analytic, Env, Url } from '~/helpers'
import Button from './base'

export default class extends React.Component {
    share = async () => {
        this.props.trigger.call(Trigger.ACTION_SHARE, 'facebook')
    }

    shareComplex = async () => {
        facebookConnectPlugin.showDialog(
            {
                method: 'share',
                href: Url.current(),
                description: SHARE_TITLE,
                picture: `${Url.current()}/og.jpeg`,
            },
            this.share,
            response =>
                Analytic.error(`facebook share ${Json.encode(response)}`),
        )
    }

    render() {
        if (Env.cordova()) {
            return (
                <Button
                    glyph={FaFacebookF}
                    hint={'share'}
                    action={this.shareComplex}
                />
            )
        } else {
            return (
                <FacebookShareButton
                    url={Url.current()}
                    onShareWindowClose={this.share}
                >
                    <Button glyph={FaFacebookF} hint={'share'} />
                </FacebookShareButton>
            )
        }
    }
}
