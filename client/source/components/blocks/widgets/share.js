import Lodash from 'lodash'
import React from 'react'
import DoubleRight from 'react-icons/lib/fa/angle-double-right'
import {
    FacebookShareButton,
    TwitterShareButton,
    RedditShareButton,
} from 'react-share'
import Facebook from 'react-icons/lib/fa/facebook'
import Twitter from 'react-icons/lib/fa/twitter'
import Reddit from 'react-icons/lib/fa/reddit'
import Styled from 'styled-components'

import { Url } from '~/helpers'
import Button from './button'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    justify-content: space-around;
`

export default class extends React.Component {
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
            return `WiT | ${names.join(' - ')}?`
        }
        return 'WiT?'
    }

    render() {
        return (
            <Container>
                <RedditShareButton url={Url.current()} title={this.title()}>
                    <Button glyph={<Reddit />} />
                </RedditShareButton>
                <TwitterShareButton url={Url.current()} title={this.title()}>
                    <Button glyph={<Twitter />} />
                </TwitterShareButton>
                <FacebookShareButton url={Url.current()} quote={this.title()}>
                    <Button glyph={<Facebook />} />
                </FacebookShareButton>
            </Container>
        )
    }
}
