import React from 'react'
import { FaAmazon, FaAppStoreIos, FaGooglePlay } from 'react-icons/fa'
import Styled from 'styled-components'

import Modal from './base'
import { Beacon } from './../button'
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

export default class extends React.Component {
    show = () => {
        this.setState(state => {
            return { ...state, active: true }
        })
    }

    hide = () => {
        this.setState(state => {
            return { ...state, active: false }
        })
    }

    constructor(props) {
        super(props)
        this.state = { active: true }
    }

    content() {
        return (
            <Container>
                <BorderWrapper>
                    <Link href={GOOGLE_PLAY_URL} target="_blank">
                        <Beacon glyph={FaGooglePlay} hint="play market" />
                    </Link>
                    <Link href={AMAZON_STORE_URL} target="_blank">
                        <Beacon glyph={FaAmazon} hint="amazon market" />
                    </Link>
                </BorderWrapper>
                <Wrapper>
                    <Link href={APP_STORE_URL} target="_blank">
                        <Beacon
                            glyph={FaAppStoreIos}
                            hint="app store (currently unavailable)"
                        />
                    </Link>
                </Wrapper>
            </Container>
        )
    }

    render() {
        return (
            <Modal
                title={'Download'}
                content={this.content()}
                active={+this.state.active}
                close={this.hide}
            />
        )
    }
}
