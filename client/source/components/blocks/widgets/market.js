import React from 'react'
import { FaAmazon, FaAppStoreIos, FaGooglePlay } from 'react-icons/fa'
import Styled from 'styled-components'

import Modal from './modal'
import Button from './button'
import { tc } from '~/theme'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const BorderWrapper = Styled(Wrapper)`
    border-right:
        ${props => props.theme[tc.msu]}
        solid
        ${props => props.theme[tc.activec]};
`

const Link = Styled.a`
    margin: ${props => props.theme[tc.normalu]};
`

const FaGooglePlayStyled = Styled(FaGooglePlay)`
    height: ${props => props.theme[tc.dbu]};
    width: ${props => props.theme[tc.dbu]};
`

const FaAmazonStyled = Styled(FaAmazon)`
    height: ${props => props.theme[tc.dbu]};
    width: ${props => props.theme[tc.dbu]};
`

const FaAppStoreIosStyled = Styled(FaAppStoreIos)`
    height: ${props => props.theme[tc.dbu]};
    width: ${props => props.theme[tc.dbu]};
`

export default class extends React.Component {
    show = () => {
        this.setState(state => {
            return { modal: true }
        })
    }

    hide = () => {
        this.setState(state => {
            return { modal: false }
        })
    }

    constructor(props) {
        super(props)
        this.state = { modal: true }
    }

    content() {
        return (
            <Container>
                <BorderWrapper>
                    <Link href={GOOGLE_PLAY_URL} target="_blank">
                        <Button
                            glyph={<FaGooglePlayStyled />}
                            hint="play market"
                            hbig={true}
                        />
                    </Link>
                    <Link href={AMAZON_STORE_URL} target="_blank">
                        <Button
                            glyph={<FaAmazonStyled />}
                            hint="amazon market"
                            hbig={true}
                        />
                    </Link>
                </BorderWrapper>
                <Wrapper>
                    <Link href={APP_STORE_URL} target="_blank">
                        <Button
                            glyph={<FaAppStoreIosStyled />}
                            hint="app store"
                            hbig={true}
                        />
                    </Link>
                </Wrapper>
            </Container>
        )
    }

    render() {
        return (
            <Modal
                title={'app markets'}
                content={this.content()}
                active={this.state.modal}
                hide={this.hide}
            />
        )
    }
}
