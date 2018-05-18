import React from 'react'
import File from 'react-icons/lib/fa/file-o'
import Styled from 'styled-components'

import Button from './button'
import Modal from './modal'

const Container = Styled.div``

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
        return (
            <Container>
                <Button glyph={<File />} action={this.show} />
                <Modal
                    title={'Disclaimer'}
                    content={this.props.settings['disclaimer-text']}
                    active={this.state.modal}
                    hide={this.hide}
                />
            </Container>
        )
    }
}
