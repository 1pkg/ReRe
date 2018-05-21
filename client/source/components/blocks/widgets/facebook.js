import React from 'react'
import { FacebookShareButton } from 'react-share'
import Facebook from 'react-icons/lib/fa/facebook'

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
            this.props.trigger.call(Trigger.ACTION_MARK, 'facebook')
        }
    }

    render() {
        return (
            <FacebookShareButton
                url={Url.current()}
                quote={this.props.settings['share-title']}
                onShareWindowClose={this.mark}
            >
                <Button glyph={<Facebook />} />
            </FacebookShareButton>
        )
    }
}
