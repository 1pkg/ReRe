import React from 'react'
import { findDOMNode } from 'react-dom'
import Check from 'react-icons/lib/fa/check'
import Star from 'react-icons/lib/fa/star-o'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Rate } from '~/helpers'
import Button from './button'
import Modal from './modal'

const Container = Styled.div``

const Form = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const pbu = 'penta-big-unit'
const Textarea = Styled.textarea`
    resize: none;
    min-width: ${props => props.theme[pbu]};
    min-height: ${props => props.theme[pbu]};
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
        Rate.rateapp(this.result, this.show)
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
                <Button glyph={<Star />} action={this.share} hint={'rate'} />
                <Modal
                    title={'Feedback'}
                    buttons={
                        <Button glyph={<Check />} action={this.feedback} />
                    }
                    content={this.content()}
                    active={this.state.modal}
                    hide={this.hide}
                />
            </Container>
        )
    }
}
