import React from 'react'
import { FaInfo } from 'react-icons/fa'
import Styled from 'styled-components'

import Modal from './base'
import { Simple } from './../button'

const Container = Styled.div``

const Text = Styled.div`
    text-align: justify;
    white-space: pre-wrap;
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
        this.state = { active: false }
    }

    render() {
        return (
            <Container>
                <Simple glyph={FaInfo} hint={'info'} action={this.show} />
                <Modal
                    title={'Disclaimer'}
                    content={<Text>{DISCLAIMER_TEXT}</Text>}
                    active={+this.state.active}
                    close={this.hide}
                />
            </Container>
        )
    }
}
