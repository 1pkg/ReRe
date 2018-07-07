import React from 'react'
import File from 'react-icons/lib/fa/file-o'
import Styled from 'styled-components'

import Button from './button'
import Modal from './modal'

const Container = Styled.div``

const Text = Styled.div`
    margin: ${props => props.theme['normal-unit']};
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
                <Button glyph={<File />} action={this.show} />
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
