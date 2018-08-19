import React from 'react'
import { FaInfo } from 'react-icons/fa'
import Styled from 'styled-components'

import Button from './button'
import Modal from './modal'

const Container = Styled.div``

const Text = Styled.div`
    text-align: justify;
    white-space: pre-wrap;
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
        this.state = { modal: false }
    }

    render() {
        let disclaimer = this.props.settings['disclaimer-text']
        return (
            <Container>
                <Button glyph={<FaInfo />} action={this.show} hint={'info'} />
                <Modal
                    title={'Disclaimer'}
                    content={<Text>{disclaimer}</Text>}
                    active={this.state.modal}
                    hide={this.hide}
                />
            </Container>
        )
    }
}
