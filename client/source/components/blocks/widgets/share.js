import Lodash from 'lodash'
import React from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    RedditShareButton,
} from 'react-share'
import Facebook from 'react-icons/lib/fa/facebook'
import Twitter from 'react-icons/lib/fa/twitter'
import Reddit from 'react-icons/lib/fa/reddit'
import Star from 'react-icons/lib/fa/star-o'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Url } from '~/helpers'
import Button from './button'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    justify-content: space-around;
`

export default class extends React.Component {
    mark = async type => {
        if (this.props.options) {
            this.props.trigger.call(Trigger.ACTION_MARK, type)
        }
    }

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    title() {
        if (this.props.options) {
            let names = Lodash.map(this.props.options, (option, index) => {
                return option.name
            })
            return `rect.io | reveal TRUE essence of image is that: ${names.join(
                ' or ',
            )} ?`
        }
        return 'rect.io | Fun quiz-game: reveal TRUE essence of image past various effects, filters and deformations.'
    }

    reddit() {
        if (!this.props.handled.reddit) {
            return (
                <RedditShareButton url={Url.current()} title={this.title()}>
                    <Button
                        glyph={<Reddit />}
                        action={Lodash.bind(this.mark, null, 'reddit')}
                    />
                </RedditShareButton>
            )
        }
        return null
    }

    twitter() {
        if (!this.props.handled.twitter) {
            return (
                <TwitterShareButton url={Url.current()} title={this.title()}>
                    <Button
                        glyph={<Twitter />}
                        action={Lodash.bind(this.mark, null, 'twitter')}
                    />
                </TwitterShareButton>
            )
        }
        return null
    }

    facebook() {
        if (!this.props.handled.facebook) {
            return (
                <FacebookShareButton url={Url.current()} quote={this.title()}>
                    <Button
                        glyph={<Facebook />}
                        action={Lodash.bind(this.mark, null, 'facebook')}
                    />
                </FacebookShareButton>
            )
        }
        return null
    }

    star() {
        if (!this.props.handled.star && this.props.star) {
            return (
                <Button
                    glyph={<Star />}
                    action={Lodash.bind(this.mark, null, 'star')}
                />
            )
        }
        return null
    }

    render() {
        return (
            <Container>
                {this.reddit()}
                {this.twitter()}
                {this.facebook()}
                {this.star()}
            </Container>
        )
    }
}
