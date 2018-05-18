import Lodash from 'lodash'
import React from 'react'
import Flag from 'react-icons/lib/fa/flag-o'
import Check from 'react-icons/lib/fa/check'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Url } from '~/helpers'
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

const Textarea = Styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 12rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
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

    report = async event => {
        let textarea = event.currentTarget.previousSibling
        this.props.trigger.call(Trigger.ACTION_REPORT, textarea.value)
        this.hide()
    }

    constructor(props) {
        super(props)
        this.state = { modal: false }
    }

    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    content() {
        let message = `I want report current task\n${Url.current()}\nfor next reason`
        return (
            <Form>
                <Textarea defaultValue={message} />
                <Button glyph={<Check />} action={this.report} />
            </Form>
        )
    }

    render() {
        return (
            <Container>
                <Button glyph={<Flag />} action={this.show} />
                <Modal
                    content={this.content()}
                    active={this.state.modal}
                    hide={this.hide}
                />
            </Container>
        )
    }
}
