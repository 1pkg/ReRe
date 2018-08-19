import React from 'react'
import { findDOMNode } from 'react-dom'
import { FaCheck, FaStar } from 'react-icons/fa'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Market } from '~/helpers'
import Button from './button'
import Modal from './modal'
import { tc } from '~/theme'

const Container = Styled.div``

const Form = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Textarea = Styled.textarea`
    resize: none;
    min-width: 75%;
    min-height: ${props => props.theme[tc.oahpbu]};
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

    feedback = async () => {
        let node = findDOMNode(this)
        let textarea = node.querySelector('textarea')
        this.props.trigger.call(Trigger.ACTION_FEEDBACK, textarea.value)
        this.hide()
    }

    result = async () => {
        this.props.trigger.call(Trigger.ACTION_SHARE, 'market')
    }

    share = () => {
        Market.rateapp(this.result, this.show)
    }

    constructor(props) {
        super(props)
        this.state = { modal: false }
    }

    content() {
        let message = 'I want leave feedback for next reason:\n'
        return (
            <Form>
                <Textarea defaultValue={message} />
            </Form>
        )
    }

    render() {
        return (
            <Container>
                <Button glyph={<FaStar />} action={this.share} hint={'rate'} />
                <Modal
                    title={'Feedback'}
                    buttons={
                        <Button glyph={<FaCheck />} action={this.feedback} />
                    }
                    content={this.content()}
                    active={this.state.modal}
                    hide={this.hide}
                />
            </Container>
        )
    }
}
